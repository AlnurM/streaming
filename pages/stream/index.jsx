import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react-lite'
import { io } from 'socket.io-client'
import LobbyStore from 'store/lobby'
import StreamStore from 'store/stream'
import { withAuth } from 'store/auth'
import { useOutsideClick } from 'hooks'
import { BASE_URL } from 'lib/server'
import * as streamFrame from 'store/stream/frame'
import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
import { Wrapper } from 'components/wrapper'
import { Button } from 'components/button'
import { MainPlayer } from 'components/player'
import { TextField } from 'components/input'
const MiniPlayer = dynamic(() => import('/components/player').then(mod => mod.MiniPlayer), {
  ssr: false,
  suspense: true,
})
const Dialog = dynamic(() => import('components/modal').then(mod => mod.Dialog), {
  suspense: true,
})

const Stream = ({ accessToken }) => {
  const socket = io(BASE_URL + '/lobby', {
    transports: ['websocket'],
    auth: {
      token: `Bearer ${accessToken}`,
    },
  })
  const [list, setList] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sourcePlayer, setSourcePlayer] = useState({
    [frameSides.LEFT_SIDE]: null,
    [frameSides.RIGHT_SIDE]: null,
    [frameSides.TOP_SIDE]: null,
    [frameSides.BOTTOM_SIDE]: null,
  })
  const { stream, inviteForm } = LobbyStore
  const { frame, focused } = StreamStore
  const frameRef = useOutsideClick(() => StreamStore.handleFocus(null))

  const handleSelectFrame = event => {
    const { id } = event.target
    StreamStore.handleFocus(id)
  }

  const handleSelectSource = player => {
    setSourcePlayer(prevState => ({
      ...prevState,
      [focused]: player
    }))
  }

  const handleInvite = event => {
    event.preventDefault()
  }

  useEffect(() => {
    socket.on('stream-hls', streamData => {
      setList(prevState => [...prevState, streamData])
    })
    return () => socket.off('stream-hls')
  }, [socket])
  return (
    <Wrapper title={stream.title || 'Название трансляции'}>
      <div className={styles.Stream} style={{ marginTop: 94 }}>
        <div className={styles.StreamSider} style={{ marginRight: 24 }}>
          <Button fullWidth type="primary" onClick={() => setIsDialogOpen(true)}>
            Пригласить оператора
          </Button>
          {list.map((item, index) => (
            <MiniPlayer
              key={index}
              src={item.streamUrl}
              onSelect={handleSelectSource}
              style={{ marginTop: 22 }}
            />
          ))}
        </div>
        <div ref={frameRef} className={styles.StreamMain}>
          <MainPlayer
            defaultPhoto={
              stream.photo ||
              'https://img.freepik.com/free-vector/leaves-background-with-metallic-foil_79603-956.jpg?w=2000'
            }
            focused={focused}
            currentFrame={frame}
            source={sourcePlayer}
            onSelect={handleSelectFrame}
          />
          <div className={styles.StreamMainFrameContainer}>
            {Object.keys({ ...streamFrame }).map((key, i) => (
              <div
                key={key}
                className={clsx(styles[`StreamMainFrame${i + 1}`], {
                  [styles.StreamMainFrameActive]: frame === key,
                })}
                onClick={() => StreamStore.handleSelectFrameType(key)}
              />
            ))}
          </div>
        </div>
      </div>
      <Dialog type="primary" isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <TextField
          name="username"
          placeholder="Username"
          label="Пригласить операторов"
          value={inviteForm.username}
          onChange={e => LobbyStore.handleChangeInviteForm(e)}
        />
        <TextField
          name="text"
          placeholder="Текст приглашения"
          value={inviteForm.text}
          onChange={e => LobbyStore.handleChangeInviteForm(e)}
          style={{ marginTop: 10 }}
        />
        <div style={{ marginTop: 22 }}>
          <Button type="secondary" style={{ marginRight: 10 }}>
            Скопировать ссылку лобби
          </Button>
          <Button type="primary" onClick={handleInvite}>
            Пригласить
          </Button>
        </div>
      </Dialog>
    </Wrapper>
  )
}

export const getServerSideProps = withAuth(async context => {
  const { accessToken } = context
  return {
    props: {
      accessToken,
    },
  }
})

export default observer(Stream)

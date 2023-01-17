import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import LobbyStore from 'store/lobby'
import { withAuth } from 'store/auth'
import { useValidateForm } from 'hooks'
import * as lobbyStatus from 'store/lobby/status'
import * as routes from 'lib/routes'
import styles from './index.module.sass'

// * COMPONENTS
import { Wrapper } from 'components/wrapper'
import { LabelWrapper } from 'components/wrapper'
import { Button } from 'components/button'
const TextField = dynamic(() => import('/components/input').then(mod => mod.TextField), {
  suspense: true,
})
const ScalingTextField = dynamic(
  () => import('/components/input').then(mod => mod.ScalingTextField),
  {
    suspense: true,
  }
)
const MultiTextField = dynamic(() => import('/components/input').then(mod => mod.MultiTextField), {
  suspense: true,
})
const FileUploader = dynamic(() => import('/components/upload').then(mod => mod.FileUploader), {
  suspense: true,
})
const Select = dynamic(() => import('/components/input').then(mod => mod.Select), {
  suspense: true,
})
const Option = dynamic(() => import('/components/input').then(mod => mod.Option), {
  suspense: true,
})
const Icon = dynamic(() => import('components/icon').then(mod => mod.Icon), {
  suspense: true,
})
const RetranslationDialog = dynamic(
  () => import('components/modal').then(mod => mod.RetranslationDialog),
  {
    suspense: true,
  }
)

const Create = ({ accessToken }) => {
  const router = useRouter()
  const { form, restreamForm, inviteForm } = LobbyStore
  const { validConfig, isValid } = useValidateForm({ ...form }, [
    'name',
    'description',
    'resolution',
    'fps',
  ])
  const { validConfig: restreamValidConfig, isValid: isRestreamValid } = useValidateForm({
    ...restreamForm,
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [valid, setValid] = useState({})
  const [restreamValid, setRestreamValid] = useState({})

  const handleRestream = ({ event, callback }) => {
    event.preventDefault()
    if (isRestreamValid) {
      setRestreamValid(restreamValidConfig)
      return
    }
    LobbyStore.handleRestreamForm()
    callback()
  }

  const handleSave = () => {
    if (isValid) {
      setValid(validConfig)
      return
    }
    LobbyStore.handleSaveForm(accessToken)
  }

  const handleInvite = event => {
    event.preventDefault()
  }

  const handleNext = () => {
    router.push(routes.STREAM_ROUTE)
  }

  return (
    <Wrapper title="Создать лобби" style={{ paddingBottom: 54 }}>
      {LobbyStore.status === lobbyStatus.SET_FORM ? (
        <div className={styles.Create} style={{ marginTop: 94 }}>
          <ScalingTextField
            name="name"
            label="Название трансляции"
            value={form.name}
            valid={valid.name}
            onChange={e => LobbyStore.handleChangeForm(e)}
          />
          <MultiTextField
            name="description"
            label="Описание трансляции"
            value={form.description}
            valid={valid.description}
            onChange={e => LobbyStore.handleChangeForm(e)}
            style={{ marginTop: 22 }}
          />
          <MultiTextField
            name="requirement"
            label="Требования к операторам"
            value={form.requirement}
            onChange={e => LobbyStore.handleChangeForm(e)}
            style={{ marginTop: 22 }}
          />
          <FileUploader
            name="images"
            label="Заглушка"
            file={form.images[0]}
            accessToken={accessToken}
            onUpload={e => LobbyStore.handleChangeForm(e)}
            style={{ marginTop: 22 }}
          />
          <LabelWrapper label="Ретрансляция" style={{ marginTop: 22 }}>
            <div className={styles.CreateTray}>
              {form.restreams.map(item => (
                <Icon
                  width={24}
                  height={24}
                  src={`/assets/ic-${item.name}.svg`}
                  style={{ marginLeft: 18, marginRight: 18 }}
                />
              ))}
              <Button type="primary" onClick={() => setIsDialogOpen(true)}>
                {!!form.restreams.length ? 'Редактировать' : 'Добавить'}
              </Button>
            </div>
          </LabelWrapper>
          <LabelWrapper label="Настройки трансляции" style={{ marginTop: 22 }}>
            <Select
              name="resolution"
              label="Разрешение"
              value={form.resolution}
              valid={valid.resolution}
              onSelect={e => LobbyStore.handleChangeForm(e)}
              style={{ marginTop: 8, maxWidth: 480 }}
            >
              <Option value={2160}>2160p 4K</Option>
              <Option value={1440}>1440p 2K</Option>
              <Option value={1080}>1080p Full HD</Option>
            </Select>
            <Select
              name="fps"
              label="FPS"
              value={form.fps}
              valid={valid.fps}
              onSelect={e => LobbyStore.handleChangeForm(e)}
              style={{ marginTop: 8, maxWidth: 480 }}
            >
              <Option value={60}>60 fps</Option>
              <Option value={30}>30 fps</Option>
            </Select>
          </LabelWrapper>
          <div className={styles.CreateGroup} style={{ marginTop: 22 }}>
            <Button type="primary" onClick={handleSave}>
              Создать лобби
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.Create}>
          <h1 className={styles.CreateTitle}>{form.name || 'Название трансляции'}</h1>
          <form className={styles.CreateGroup} onSubmit={handleInvite} style={{ marginTop: 22 }}>
            <TextField
              fullWidth
              name="username"
              placeholder="Username"
              label="Пригласить операторов"
              value={inviteForm.username}
              onChange={e => LobbyStore.handleChangeInviteForm(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              fullWidth
              name="text"
              placeholder="Текст приглашения"
              value={inviteForm.text}
              onChange={e => LobbyStore.handleChangeInviteForm(e)}
              style={{ marginRight: 10 }}
            />
            <Button type="primary">Пригласить</Button>
          </form>
          <LabelWrapper label="Операторы" style={{ marginTop: 22 }}></LabelWrapper>
          <div className={styles.CreateGroup} style={{ marginTop: 22 }}>
            <Button type="secondary" style={{ marginRight: 10 }}>
              Скопировать ссылку лобби
            </Button>
            <Button type="primary" onClick={handleNext}>
              Далее
            </Button>
          </div>
        </div>
      )}
      <RetranslationDialog
        isOpen={isDialogOpen}
        form={restreamForm}
        list={form.restreams}
        valid={restreamValid}
        onEdit={e => LobbyStore.handleEditRestream(e)}
        onChange={e => LobbyStore.handleChangeRestreamForm(e)}
        onSubmit={handleRestream}
        onClose={() => setIsDialogOpen(false)}
      />
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

export default observer(Create)

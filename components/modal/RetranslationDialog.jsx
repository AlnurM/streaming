import { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './index.module.sass'

// * COMPONENTS
const Dialog = dynamic(() => import('components/modal').then(mod => mod.Dialog), {
  suspense: true,
})
const DialogHeader = dynamic(() => import('components/modal').then(mod => mod.DialogHeader), {
  suspense: true,
})
const TextField = dynamic(() => import('/components/input').then(mod => mod.TextField), {
  suspense: true,
})
const Button = dynamic(() => import('components/button').then(mod => mod.Button), {
  suspense: true,
})
const Icon = dynamic(() => import('components/icon').then(mod => mod.Icon), {
  suspense: true,
})

const config = {
  0: {
    title: 'Ретрансляции',
    Component: ({ list = [], onEdit, onNext, onClose }) => {
      return (
        <div className={styles.RetranslationDialog}>
          <div className={styles.RetranslationDialogHeader}>
            <span className={styles.RetranslationDialogHeaderText}>
              {list.length} из {list.length} активны
            </span>
          </div>
          <div className={styles.RetranslationDialogContent}>
            {list.map(item => (
              <div key={item.name} className={styles.RetranslationDialogContentItem}>
                <Icon width={32} height={32} src={`/assets/ic-${item.name}.svg`} />
                <span className={styles.RetranslationDialogContentText}>
                  {item.name.toCapitalCase()}
                </span>
                <span 
                  className={styles.RetranslationDialogContentLink}
                  onClick={() => onEdit(item)}
                >
                  Изменить
                </span>
              </div>
            ))}
          </div>
          <div className={styles.RetranslationDialogGroup} style={{ marginTop: 24 }}>
            <Button
              type="secondary"
              fullWidth
              onClick={() => onNext(2)}
              style={{ marginRight: 10 }}
            >
              Добавить
            </Button>
            <Button type="primary" fullWidth onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      )
    },
  },
  1: {
    title: null,
    Component: ({ form, valid, onChange, onSubmit }) => {
      return (
        <form onSubmit={onSubmit} className={styles.RetranslationDialogStreaming}>
          <TextField
            fullWidth
            name="url"
            label="RTMP URL"
            placeholder="RTMP URL"
            value={form.url}
            valid={valid.url}
            onChange={onChange}
            style={{ marginTop: 16 }}
          />
          <TextField
            fullWidth
            name="key"
            label="Stream Key"
            placeholder="Stream Key"
            value={form.key}
            valid={valid.key}
            onChange={onChange}
            style={{ marginTop: 16 }}
          />
          <Button type="primary" fullWidth style={{ marginTop: 32 }}>
            Добавить канал
          </Button>
        </form>
      )
    },
  },
  2: {
    title: 'Платформы',
    Component: ({ onSelect }) => {
      const platformConfig = {
        instagram: '/assets/ic-instagram.svg',
        twitter: '/assets/ic-twitter.svg',
        github: '/assets/ic-github.svg',
        dribble: '/assets/ic-dribble.svg',
      }
      return (
        <div className={styles.RetranslationDialogPlatform}>
          {Object.keys(platformConfig).map(key => (
            <div className={styles.RetranslationDialogPlatformItem} onClick={() => onSelect(key)}>
              <div
                className={styles.RetranslationDialogPlatformImg}
                style={{ backgroundImage: `url(${platformConfig[key]})` }}
              />
              <span className={styles.RetranslationDialogPlatformText}>{key.toCapitalCase()}</span>
            </div>
          ))}
        </div>
      )
    },
  },
}

const RetranslationDialog = ({ isOpen, form, list, valid, onChange, onEdit, onSubmit, onClose }) => {
  const [selectedContent, setSelectedContent] = useState(list.length ? 0 : 2)

  const handleGoBack = () => {
    setSelectedContent(prevState => (prevState === 0 ? 0 : prevState - 1))
  }

  const handleNext = (index = selectedContent + 1) => {
    setSelectedContent(index)
  }

  const handleSelect = name => {
    onChange({ name: 'name', value: name })
    handleNext(1)
  }

  const handleEdit = (event) => {
    onEdit(event)
    handleNext()
  }
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader onGoBack={handleGoBack} style={{ width: 480 }}>
        {config[selectedContent].title || form.name.toCapitalCase()}
      </DialogHeader>
      {config[selectedContent].Component({
        form,
        list,
        valid,
        onChange,
        onEdit: handleEdit,
        onNext: handleNext,
        onSelect: name => handleSelect(name),
        onSubmit: event => onSubmit({ event, callback: handleGoBack }),
        onClose,
      })}
    </Dialog>
  )
}

export default RetranslationDialog

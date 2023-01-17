import { useState } from 'react'
import axios from 'axios'
import { createError } from 'lib/server'
import styles from './index.module.sass'

// * COMPONENTS
import LabelWrapper from 'components/wrapper/LabelWrapper'

const FileUploader = ({ label, name, file, accessToken, onUpload, style }) => {
  const [drag, setDrag] = useState(false)

  const dragStartHandler = event => {
    event.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = event => {
    event.preventDefault()
    setDrag(false)
  }

  const handleUpload = async event => {
    event.preventDefault()
    const src = event.dataTransfer || event.target
    const files = [...src.files]
    setDrag(false)
    try {
      const formData = new FormData()
      formData.append('images', files[0])
      const response = await axios.post('/lobby/upload-plug', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      onUpload({
        name,
        value: response.data,
      })
    } catch (e) {
      console.log(createError(e))
    }
  }

  return (
    <LabelWrapper label={label} style={style}>
      <div className={styles.FileUploaderContent}>
        <div
          className={styles.FileUploaderForm}
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
          onDrop={handleUpload}
        >
          <div className={styles.IconFileUpload} style={{ marginBottom: 12 }} />
          {drag ? (
            <span className={styles.FileUploaderFormTitle}>Release your file</span>
          ) : (
            <span className={styles.FileUploaderFormTitle}>
              <input id={name} hidden type="file" accept="image/*" onChange={handleUpload} />
              <label htmlFor={name} className={styles.FileUploaderFormLink}>
                Upload a file
              </label>
              or drag and drop
            </span>
          )}
          <span className={styles.FileUploaderFormText}>PNG, JPG, JPEG up to 10MB</span>
        </div>
        <div className={styles.FileUploaderItem} style={{ backgroundImage: `url(${file?.path})` }} />
      </div>
    </LabelWrapper>
  )
}

export default FileUploader

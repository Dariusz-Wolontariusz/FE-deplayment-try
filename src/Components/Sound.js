import React, { useEffect, useState, useContext } from 'react'
import MainContext from '../Context'
import playButton from './Buttons/play-button-pink.png'

const Sound = () => {
  const { soundList, setSoundList } = useContext(MainContext)
  const [soundToPlay, setSoundToPlay] = useState([])
  const [soundIsRefreshed, setSoundIsRefreshed] = useState(true)

  useEffect(() => {
    fetch('/sounds')
      .then(result => result.json())
      .then(result => setSoundList(result))
  }, [setSoundList, soundIsRefreshed])

  useEffect(() => {
    if (soundList.length > 0) setSoundToPlay([soundList[0]])
  }, [soundList])

  const getSoundFunction = e => {
    const newPlaySong = soundList.filter(song => song.title === e.target.value);
    setSoundToPlay(newPlaySong)
  }

  const playSound = () => {
    document.getElementById('player').play()
  }

  const [soundFile, setSoundFile] = useState('')

  const saveChanges = e => {
    e.preventDefault()
    setSoundFile(e.target.files[0])
  }

  const handleSoundUploadChange = async () => {
    setSoundIsRefreshed(false)
    let formData = new FormData()
    formData.append('sound', soundFile)
    const response = await fetch('/sounds', {
      method: 'POST',
      body: formData,
    })
      .then
    setSoundIsRefreshed(true)
  }

  return (
    soundIsRefreshed && <div className='Sound'>
      <label className='Sound-lable' htmlFor='SoundSelector'>🎶 </label>
      <select name='SoundSelector'
        onChange={getSoundFunction}
        className='Sound-selector' >
        {soundList && soundList.map((sound, index) =>
          <option
            key={sound.title + index}
            value={sound.title} >
            {sound.title}
          </option>
        )}
      </select>
      {soundToPlay.length > 0 && soundToPlay[0] !== undefined &&
        <>
          <audio id='player' src={soundToPlay[0].url}></audio>
          <button className='Sound-player--button' onClick={playSound}>
            <img src={playButton} alt='play' />
          </button>

          <label className='Sound-input--label' htmlFor='SoundInput'>Upload your sound:</label>
          <input
            className='Sound-input'
            type='file'
            name='SoundInput'
            accept='audio/*'
            environment
            onChange={saveChanges}
          />
          <button onClick={handleSoundUploadChange}>Submit</button>
        </>
      }
    </div>
  )
}

export default Sound
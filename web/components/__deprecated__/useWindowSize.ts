import {useEffect, useState} from 'react'
import {useIsBrowser} from '@lib/utils'

export const useWindowSize = () => {
  const isBrowser = useIsBrowser()

  const getSize = () => ({
      height: isBrowser ? window.innerHeight : 0,
      width: isBrowser ? window.innerWidth : 0,
    })

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isBrowser) return

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)


    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

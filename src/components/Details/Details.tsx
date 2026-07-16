import { useEffect, useState } from 'react'
import type { UserDetails } from '../../types'
import DetailsEmpty from './DetailsEmpty'
import DetailsError from './DetailsError'
import DetailsSkeleton from './DetailsSkeleton'
import DetailsCard from './DetailsCard'

interface DetailsProps {
  info: { id: number; name: string } | null
}

function Details({ info }: DetailsProps) {
  const [userData, setUserData] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadedId, setLoadedId] = useState<number | null>(null)

  useEffect(() => {
    if (!info) {
      return
    }

    if (loadedId === info.id) {
      return
    }

    let cancelled = false

    const fetchDetails = async () => {
      try {
        setUserData(null)
        setLoading(true)
        setError(null)
        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
        )
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные пользователя')
        }
        const data = await response.json()
        if (!cancelled) {
          data.avatar = `https://i.pravatar.cc/300?img=${info.id}`
          setUserData(data)
          setLoadedId(info.id)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Произошла ошибка')
          setUserData(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchDetails()

    return () => {
      cancelled = true
    }
  }, [info, loadedId])

  if (!info) return <DetailsEmpty />
  if (loading) return <DetailsSkeleton />
  if (error) return <DetailsError message={error} />
  if (!userData) return <DetailsError message="Данные не найдены" />
  return <DetailsCard data={userData} />
}

export default Details
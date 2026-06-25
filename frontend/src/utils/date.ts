import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (date: string | Date) => format(new Date(date), 'MMM d, yyyy')
export const formatRelative = (date: string | Date) => formatDistanceToNow(new Date(date), { addSuffix: true })
export const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

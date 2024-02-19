import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para formatear la fecha en formato para nuestra tabla de juegos
export function formatearFecha(fechaISO: string): string {
  // Convertir la fecha ISO a un objeto Date
  const fecha = new Date(fechaISO)

  // Obtener los componentes de la fecha
  const año = fecha.getFullYear().toString().slice(2) // Obtener solo los dos últimos dígitos del año
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0') // Añadir un cero si el mes es menor a 10
  const dia = fecha.getDate().toString().padStart(2, '0') // Añadir un cero si el día es menor a 10
  const hora = fecha.getHours().toString().padStart(2, '0') // Añadir un cero si la hora es menor a 10
  const minutos = fecha.getMinutes().toString().padStart(2, '0') // Añadir un cero si los minutos son menores a 10

  // Formatear la fecha en el formato deseado
  const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}`

  return fechaFormateada
}

export function formatearDateRange(date: DateRange | undefined): string {
  if (!date) {
    return `dateFrom=${new Date().toISOString().split('T')[0]}&dateTo=${addDays(new Date(), 1).toISOString().split('T')[0]}`
  }
  if (date.from && !date.to) {
    return `dateFrom=${date.from.toISOString().split('T')[0]}&dateTo=${addDays(date.from, 1).toISOString().split('T')[0]}`
  }

  const fechaInicio = date.from?.toISOString().split('T')[0]
  const fechaFin = date.to?.toISOString().split('T')[0]

  return `dateFrom=${fechaInicio}&dateTo=${fechaFin}`
}

// Función para obtener la semana actual en formato de query string
export function obtenerSemanaActual(): string {
  // Obtener la fecha actual
  const fechaActual = new Date()

  // Obtener el primer día de la semana
  const primerDiaSemana = obtenerPrimerDiaSemana(fechaActual)

  // Obtener el último día de la semana
  const ultimoDiaSemana = obtenerUltimoDiaSemana(fechaActual)

  // Formatear las fechas al formato deseado
  const fechaInicio = primerDiaSemana.toISOString().split('T')[0]
  const fechaFin = ultimoDiaSemana.toISOString().split('T')[0]

  // Devolver el string con las fechas formateadas
  return `dateFrom=${fechaInicio}&dateTo=${fechaFin}`
}

// Función para obtener el primer día de la semana
export function obtenerPrimerDiaSemana(fecha: Date): Date {
  const dia = fecha.getDay()
  const diferenciaDias = dia === 0 ? 6 : dia - 1
  const primerDiaSemana = new Date(
    fecha.getTime() - diferenciaDias * 24 * 60 * 60 * 1000
  )
  return primerDiaSemana
}

// Función para obtener el último día de la semana
export function obtenerUltimoDiaSemana(fecha: Date): Date {
  const dia = fecha.getDay()
  const diferenciaDias = dia === 0 ? 0 : 7 - dia
  const ultimoDiaSemana = new Date(
    fecha.getTime() + diferenciaDias * 24 * 60 * 60 * 1000
  )
  return ultimoDiaSemana
}

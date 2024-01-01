import React, { ReactEventHandler, MouseEvent } from 'react'

export const blockEvent: ReactEventHandler = e => {
  e.stopPropagation()
  e.preventDefault()
}

export const isMouseDownContextMenu = (e: MouseEvent): boolean => {
  return e.button === 2
}

export const blockDragEvent = {
  onDrop: blockEvent,
  onDragOver: blockEvent,
  onDragStart: blockEvent,
  onDragEnd: blockEvent,
  onDragEnter: blockEvent,
}

export const stopEventPropagation: ReactEventHandler = e => {
  e.stopPropagation()
}

export const stopPropagationMouseEvent = {
  onMouseDown: stopEventPropagation,
  onMouseOver: stopEventPropagation,
  onMouseUp: stopEventPropagation,
}

export const setDragCursor = (type: 'col' | 'row' | 'empty'): void => {
  const bodyEl = document.body
  if (type === 'empty') {
    bodyEl.className = ''
    return
  }
  bodyEl.classList.add(`${type}-resizing`)
}

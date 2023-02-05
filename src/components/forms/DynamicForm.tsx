/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ReactEventHandler } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

const DynamicForm = () => {
  const { control, register } = useForm({
    defaultValues: {
      items: [{ name: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: `items`,
  })

  // handlers
  const addItem: ReactEventHandler = e => {
    e.preventDefault()
    append({ name: '' })
  }

  const subItem =
    (idx: number): ReactEventHandler =>
    (e): void => {
      e.preventDefault()
      remove(idx)
    }

  return (
    <div>
      {fields.map((field, idx) => (
        <span>
          <input key={field.id} {...register(`items.${idx}.name`)} />
          {idx > 0 && <button onClick={subItem(idx)}>x</button>}
        </span>
      ))}
      <button onClick={addItem}>+</button>
    </div>
  )
}

export default DynamicForm

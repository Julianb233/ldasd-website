'use client'

// WIZ-02: Individual field renderer with error display

import type { WizardField as WizardFieldType } from '@/lib/wizard/types'

type WizardFieldProps = {
  field: WizardFieldType
  value: unknown
  error?: string
  onChange: (name: string, value: unknown) => void
}

export default function WizardField({ field, value, error, onChange }: WizardFieldProps) {
  const baseInputClasses = `
    w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400
    transition-colors duration-150
    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
    ${error ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'}
  `

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
      case 'number':
        return (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={(value as string) ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseInputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
        )

      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={(value as string) ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={4}
            className={baseInputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
        )

      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseInputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          >
            <option value="">{field.placeholder ?? 'Select...'}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-2" role="radiogroup" aria-labelledby={`${field.name}-label`}>
            {field.options?.map((opt) => (
              <label
                key={opt.value}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                  ${(value as string) === opt.value
                    ? 'border-primary bg-primary/5 text-gray-900'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }
                `}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={(value as string) === opt.value}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name={field.name}
              checked={(value as boolean) ?? false}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              aria-invalid={!!error}
              aria-describedby={error ? `${field.name}-error` : undefined}
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-1.5">
      {field.type !== 'checkbox' && (
        <label
          id={`${field.name}-label`}
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {renderInput()}

      {field.helpText && !error && (
        <p className="text-xs text-gray-500">{field.helpText}</p>
      )}

      {error && (
        <p id={`${field.name}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

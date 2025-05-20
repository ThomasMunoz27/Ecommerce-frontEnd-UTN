import { ChangeEvent, FC } from "react"
import styles from "./Input.module.css"

interface Iinput {
    label: string,
    name: string,
    value: string | number,
    type:string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    error?: string
}

export const Input:FC<Iinput> = ({label, name, value, type, handleChange, error}) => {
    const isValid = value && !error
  return (
    <div className={styles.inputWrapper}>
			<label htmlFor={name} className={styles.label}>{label}</label>
			<div className={`${styles.inputContainer} ${error ? styles.inputError : isValid ? styles.inputSuccess : ""}`}>
				<input
					id={name}
					name={name}
					type={type}
					value={value}
					onChange={handleChange}
					className={styles.input}
				/>
				{isValid && <span className={styles.checkmark}>✓</span>}
			</div>
			{error && <p className={styles.errorMessage}>{error}</p>}
		</div>
  )
}
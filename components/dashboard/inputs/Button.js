const Button = ({ type = 'submit', className ,disabled, ...props  }) => (
    <button
        type={type}
        disabled={disabled}
        className={`${className}   ${disabled ? 'bg-clifford text-pallete' : ''} transition ease-in-out duration-150`}
        {...props}
    />
)

export default Button

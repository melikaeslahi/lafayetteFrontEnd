const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block text-pallete text-sm font-bold mb-2`}

        {...props}>
        {children}
    </label>
    
)

export default Label

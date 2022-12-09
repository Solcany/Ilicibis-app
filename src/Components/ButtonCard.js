const ButtonCard = ({children, onClick, className}) => {
	return (
		<button onClick={onClick}
				className={className}>
			{children}
		</button>
	)
}

export default ButtonCard
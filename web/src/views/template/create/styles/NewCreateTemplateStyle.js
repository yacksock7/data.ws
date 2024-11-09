export const styles = (theme) => ({
    root:{
        marginTop: 10
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '1.125rem',
            color: '#323232',
            letterSpacing: '-0.37px',
            fontWeight: 'bold',
            marginBottom: 10
        }
    },
    textareaBox: {
        width: 614,
        resize: 'none',
        height: 120,
        border: '1px solid rgba(50, 50, 50, 0.8)',
        borderRadius: 4.5,
        fontSize: '1rem',
        letterSpacing: '-0.5px',
        color: '#323232',
        padding: 10,
        boxSizing: 'border-box',
        lineHeight: 1.4,
        '&:focus': {
            outline: 'none',
        },
        '&::placeholder': {
            color: '#323232',
            opacity: 0.6
        },
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#969696',
            borderRadius: '10px',
            backgroundClip: 'padding-box',
            border: '3px solid transparent',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginTop: 5,
        },
    },
});
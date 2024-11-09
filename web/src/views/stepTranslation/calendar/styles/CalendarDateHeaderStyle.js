export const styles = (theme) => ({
    toolbarBox:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    dateHeaderPadding:{
        marginTop: 4,
        marginLeft: 4,
        marginBottom: 4,
        boxSizing: 'border-box',
        width: 20,
        height: 20,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        background: '#fff',
        '& span':{
            fontSize: '0.75rem',
            color: '#323232',
            letterSpacing: '-0.5px',
        }
    },
});



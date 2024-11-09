export const styles = (theme) => ({
    root:{
        marginTop: 70,
        minHeight: 'calc(100vh - 70px)',
        padding: '22px 24px',
        boxSizing: 'border-box',
        background: '#eee'
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '1.25rem',
            color:'#323232',
            letterSpacing: '-0.44px',
            marginBottom: 10
        }
    }
});
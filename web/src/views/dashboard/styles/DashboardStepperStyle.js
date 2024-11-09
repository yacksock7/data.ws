export const styles = (theme) => ({
    root:{
        width: '100%',
        border: '1px solid #bbb',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
        borderRadius: 6,
        background:'#fff',
        padding: '25px 12px 23px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent:'center',
        marginBottom: 20,
    },
    rootIn:{
        position: 'relative',
    },
    toggleButton:{
        '&.MuiToggleButtonGroup-root':{
            width: '100%',
            boxSizing:'border-box',
            display: 'flex',
            justifyContent:'space-between',
            position: 'relative',
            zIndex: 100,
            '& .MuiButtonBase-root':{
                borderRadius: 0,
                border: '0px !important',
                boxSizing:'border-box',
                padding:0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '& .text':{
                    fontSize: '0.875rem',
                    color:'#323232',
                    letterSpacing: '-0.44px',
                    fontWeight: 'bold',
                    margin: '7px 0 0'
                },
                '&.Mui-selected':{
                    '& div':{
                        background:'#7500fa',
                        border: '2px solid #7500fa',
                        '& p':{
                            color: '#fff'
                        }
                    },
                    background: 'transparent'
                },
                '&:hover':{
                    background: 'transparent'
                }
            }
        }
    },
    circleBox:{
        width: 50,
        height: 50,
        borderRadius: '50%',
        border: '2px solid #CACACA',
        background:'#eee',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',

        '& p':{
            fontSize:'1.25rem',
            color:'#777777',
            letterSpacing: '-0.44px',
            fontWeight: 800
        }
    },
    text:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.44px',
            fontWeight: 'bold',
            margin: '7px 0 0'
        }
    },
    lineStyle:{
        position: 'absolute',
        width: '100%',
        top: 25,
        height: 2,
        background:'#CACACA'
    }
});
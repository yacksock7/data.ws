export const styles = (theme) => ({
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color:'#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px'
        }
    },
    toggleButton:{
        '&.MuiToggleButtonGroup-root':{
            boxSizing:'border-box',
            minHeight: 31,
            height: 31,
            marginLeft: 15,
            '& .MuiButtonBase-root':{
                borderRadius: 6,
                border: '1px solid #bbb',
                boxSizing:'border-box',
                width: 70,
                padding:0,
                fontSize: '0.875rem',
                color:'#323232',
                letterSpacing: '-0.49px',
                background:'#fff',
                borderLeft: '1px solid #bbb !important',
                '&.Mui-selected':{
                    border: '1px solid #39007a !important',
                    background:'#7500fa',
                    color:'#fff',
                    fontWeight: 'bold'
                }
            }
        }
    },
});
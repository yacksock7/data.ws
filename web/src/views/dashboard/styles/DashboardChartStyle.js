export const styles = (theme) => ({
    root:{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
        '@media all and (min-width: 2050px)': {
            gridTemplateColumns: 'repeat(5, 1fr)',
        },
        '@media all and (max-width: 1530px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },

    },
    cardContainer:{
        position:'relative',
        width: '100%',
        borderRadius:10,
        boxShadow:'0 4px 4px 0 rgba(0, 0, 0, 0.25)',
        background:'#fff',
        boxSizing: 'border-box',
        '&:after':{
            display: 'block',
            content:"''",
            paddingBottom: '80%',
        }
    },
    box:{
        position:'absolute',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: '13px 15px',
    },
    chartBox:{
        width: '100%',
        height: 'calc(100% - 36px)',
        position:'relative',
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    centerText:{
        position:'absolute'
    },
    titleBox:{
        '& svg':{
            width: 36,
            height: 36
        },
        '& .MuiTypography-root': {
            fontSize: '1.125rem',
            color: '#323232',
            fontWeight: 'bold',
            marginLeft: 6
        }
    },
    textStyle:{
        '&.MuiTypography-root': {
            textAlign:'center',
            fontSize: '2.25rem',
            color:'#323232',
            fontWeight: 800,
            lineHeight: 1,
            '& span':{
                fontSize: '1.125rem'
            },
            '@media all and (max-width: 1700px)': {
                fontSize: '1.75rem',
                '& span':{
                    fontSize: '1.0rem'
                }
            },
        },
    },
    subText:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color:'#323232',
            opacity: 0.8,
            textAlign:'center',
        }
    },
    //차트 css
});
export const styles = (theme) => ({
    root:{

    },
    accordionBox: {
        '&.MuiPaper-root':{
            borderBottom: '1px solid #c0c2c3 !important',
            boxShadow: 'none',
            margin: '0 auto',
            borderRadius: '0 !important',
            '&.Mui-expanded':{
               margin:0
            }
        },
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '& .MuiAccordionSummary-root.Mui-expanded': {
            marginBottom: 0,
            minHeight: 10,
            '& .MuiAccordionSummary-content': {
                margin: '15px 20px',
            },
        },
        '& .MuiAccordionSummary-content': {
            margin: '15px 20px',
            display: 'flex',
            alignItems: 'center',
            minHeight: 10,
        },
        '& .MuiAccordionSummary-root': {
            padding: 0,
        },
        '&:last-child': {
            borderRadius: 0,
        },
    },
    accordionBoxTop: {
        '&.MuiPaper-root': {
            borderTop: '3px solid #000',
            borderBottom: '1px solid #c0c2c3',
        }
    },
    titleText:{
        '&.MuiTypography-root': {
            width: 190,
            fontSize: '1rem',
            color: 'rgba(50, 50, 50, 0.6)',
            fontWeight:800,
            letterSpacing: '-0.5px',
        }
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '1.125rem',
            color: '#323232',
            fontWeight:'bold',
            letterSpacing: '-0.5px',
        }
    },
    accordionDetails:{
        '&.MuiAccordionDetails-root':{
            borderTop: '1px solid #c0c2c3',
            padding: '16px 30px',
            '& p':{
                fontSize: '1rem',
                color:'#323232',
                letterSpacing: '-0.5px'
            }
        }
    }
});
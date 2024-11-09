import MainBgImg from "../../../src/common/images/MainBgImg.png";


export const styles = (theme) => ({
    root:{
        // width: '100%',
        // minHeight: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // background: '#e5e5e5',
        // boxSizing: 'border-box',
        // padding: 30,
        height: '100vh',
        backgroundImage: `url(${MainBgImg})`,
        backgroundSize: 'contain',
        backgroundRepeat:'no-repeat',
        backgroundPosition: 'bottom right',
        '@media all and (max-width: 1300px)': {
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
        },

    },
    pcOnly: {
        display: 'inline',
        '& svg': {
            width: '160px'
        },
        '@media all and (max-width: 800px)': {
            display: 'none',
        },

    },
    mobileOnly: {
        display: 'none',
        '& img': {
          width: '65px'
        },
        '@media all and (max-width: 800px)': {
            display: 'inline',
        },

    },

    headerBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        padding: '0 34px 0 29px',
        background: 'rgba(255,255,255, 0.9)',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
        zIndex: 999,
        '@media all and (max-width: 800px)': {
            padding: '0 15px',
        },
    },
    textWrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100vh - 70px)',
        marginLeft: 97,
        '@media all and (max-width: 1300px)': {
            margin: '0 15px',
        },
        '@media all and (max-width: 800px)': {
            justifyContent: 'start',
            marginTop: 20,
        },
    },

    mainTitle: {
        '&.MuiTypography-root': {
            fontSize: '4.25rem',
            fontWeight: 700,
            lineHeight: '87px',
            letterSpacing: '-0.5px',
            '@media all and (max-width: 1300px)': {
                fontSize: '3.25rem',
                lineHeight: '70px',
            },
            '@media all and (max-width: 800px)': {
                fontSize: '1.5rem',
                lineHeight: '35px',
            },
        }

    },
    mainSubTitle: {
        '&.MuiTypography-root': {
            fontSize: '1.5rem',
            lineHeight: '32.2px',
            letterSpacing: '-0.5px',
            marginTop: 30,
            marginBottom: 40,
            '@media all and (max-width: 800px)': {
                fontSize: '1.25rem',
                lineHeight: '28px',
                marginTop: 20,
                marginBottom: 30,
            },
        }
    },
    freeStartBtn: {
        marginBottom: 60,
        '@media all and (max-width: 800px)': {
            marginBottom: 30,
        },
        '& .MuiButtonBase-root': {
            width: 240,
            height: 64,
            background: '#7500fa',
            borderRadius: 6,
            '@media all and (max-width: 800px)': {
                width: 140,
                height: 50,
            },
            '&.MuiButton-root:hover': {
                background: '#7500fa',
            },
            '& .MuiTypography-root': {
                fontSize: '1.375rem',
                letterSpacing: '-0.5px',
                fontWeight: 700,
                color: '#fff',
                '@media all and (max-width: 800px)': {
                    fontSize: '1.125rem',
                },
            }
        }
    },
    infoText: {
        '& .MuiTypography-root': {
            fontSize: '2.125rem',
            color: '#323232',
            lineHeight: '45px',
            letterSpacing: '-0.5px',
            fontWeight: 700,
            '& span': {
                color: '#0673e5'
            },
            '@media all and (max-width: 800px)': {
                fontSize: '1.25rem',
                lineHeight: '28px',
            },
        },

    },
    infoTextMargin: {
        marginTop:20,
        marginBottom: 190,
        '@media all and (max-width: 1400px)': {
            marginTop:10,
            marginBottom: 90,
        },
        '@media all and (max-width: 800px)': {
            marginTop:10,
            marginBottom: 40,
        },
    },
    copyRight: {
        '&.MuiTypography-root': {
            fontSize: '0.938rem',
            color: '#323232',
            lineHeight: '20px',
            letterSpacing: '-0.5px',
            fontWeight: 300,
        }
    },




    boxStyle:{
        minWidth: 640,
        boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.25)',
        borderRadius: 14,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 30px',
        boxSizing: 'border-box'
    },
    logoBox:{
        marginBottom: 34,
        cursor:'pointer'
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '2.125rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#323232',
            marginBottom: 60
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root':{
            width: 384,
            height: 58,
            background: '#7500fa',
            borderRadius: 6,
            fontSize: '1.25rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            '&:hover':{
                background: '#9d4bfb'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
    bottomBox:{
        width: 384,
        marginTop: 10,
        display: 'flex',
        alignItems: 'center'
    },
    loginText:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: 'rgba(50, 50, 50, 0.6)',
            letterSpacing: '-0.5px',
            marginRight: 10
        }
    },
    loginButton:{
        '&.MuiButtonBase-root':{
            background: 'transparent',
            padding:0,
            minWidth: 20,
            color: '#323232',
            fontWeight: 'bold',
            textDecoration: 'underline',
            '&:hover':{
                background: 'transparent',
                textDecoration: 'underline',
            }
        }
    }
});
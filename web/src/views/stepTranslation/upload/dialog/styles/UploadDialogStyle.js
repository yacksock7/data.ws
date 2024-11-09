export const styles = (theme) => ({
    dialogBox:{
        '& .MuiDialog-paper':{
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.25)',
            borderRadius: 6,
            background: '#fff',
            boxSizing: 'border-box',
            padding: '20px 15px 32px',
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        }
    },
    dropzoneBox:{
        '& .MuiDropzoneArea-root':{
            width: 570,
            minHeight: 280,
            background: '#fff',
            borderRadius: 6,
            border: '2px dashed rgba(50, 50, 50, 0.6)',
            marginBottom: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& .MuiDropzoneArea-textContainer':{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& p':{
                width: 445,
                order:1,
                margin:0,
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: '#777',
                letterSpacing: '-0.5px',
                paddingTop:24,
            },
            '& svg':{
                order:0,
            }
        },
        '& .MuiDropzonePreviewList-root':{
            display:'none'
        }
    },
    buttonStyle: {
        '&.MuiButtonBase-root': {
            width: 190,
            height: 44,
            background: '#7500fa',
            borderRadius: 7.5,
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            margin: '0 auto',
            '&:hover':{
                background: '#9d4bfb',
            }
        }
    },
});



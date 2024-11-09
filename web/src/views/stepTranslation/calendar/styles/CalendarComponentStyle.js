export const styles = (theme) => ({
    root:{
        '& .rbc-month-view':{
            borderTop: '1px solid rgba(119, 119, 119, 0.6)',
            borderBottom: '1px solid rgba(119, 119, 119, 0.2)',
            borderLeft: 0,
            borderRight: 0,
        },
        '& .rbc-header':{
            padding: '0 6px',
            height: 24,
            background: '#eee',
            borderLeft: 0,
            textAlign: 'left',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            '& span':{
                fontSize: '0.75rem',
                color: '#323232',
                letterSpacing: '-0.5px',
                textAlign: 'left',
                fontWeight: 'normal'
            }
        },
        '& .rbc-row-bg':{
            '& > div':{
                borderLeft: '1px solid rgba(119, 119, 119, 0.2)',
                '&:first-child':{
                    borderLeft: 0
                }
            }
        },
        '& .rbc-off-range-bg':{
            background: '#fff',
        },
        '& .rbc-off-range':{
            '& div':{
                '& span':{
                    color: '#777 !important'
                }
            }
        },
        '& .rbc-month-header':{
            '& div:first-child':{
                '& span':{
                    color: '#d91e50'
                }
            },
            '& div:last-child':{
                '& span':{
                    color: '#056cf2'
                }
            }
        },
        '& .rbc-row':{
            '& .rbc-date-cell:first-child span:first-child':{
                color: '#d91e50'
            },
            '& .rbc-date-cell:last-child span:first-child':{
                color: '#056cf2',
            },

        },
        '& .rbc-today':{
            background: '#fff',
        },
        '& .rbc-now':{
            '& div > div':{
                background: 'rgba(117, 0, 250, 0.2)',
            },
            '& span, p':{
                fontWeight: 'normal'
            }
        },
        '& .rbc-date-cell':{
            paddingRight: 0
        },
        '& .rbc-event':{
            height: 3,
            marginTop: 2,
            marginBottom: 2,
            pointerEvents: 'none'
        }
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '1.125rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginBottom: 14
        }
    }
});



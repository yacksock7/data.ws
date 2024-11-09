import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/HelpAccordionStyle";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import clsx from "clsx";
class HelpAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
            accordionList: [
                {expanded: 'panel1', type: '가입', question:'기업 서비스 가입 및 이용 절차가 궁금합니다.', answer: '답변 내용'},
                {expanded: 'panel2', type: '가입', question:'무료 이용 가능한가요?', answer: '답변 내용'},
                {expanded: 'panel3', type: '가입', question:'엔터프라이즈 비용은 얼마인가요?', answer: '답변 내용'},
                {expanded: 'panel4', type: '이용 전반', question:'etymer (에티머) 시작하기', answer: '답변 내용'},
                {expanded: 'panel5', type: '이용 전반', question:'작업, 템플릿이란 무엇인가요?', answer: '답변 내용'},
                {expanded: 'panel6', type: '사용법', question:'작업 생성 및 템플릿은 어떻게 만드나요?', answer: '답변 내용'},
                {expanded: 'panel7', type: '사용법', question:'작업 그룹은 어떻게 사용하나요?', answer: '답변 내용'},
                {expanded: 'panel8', type: '회원', question:'회원 탈퇴를 하고 싶습니다.', answer: '답변 내용'},
                {expanded: 'panel9', type: '요금제', question:'정기결제를 잠시 중지 또는 해지하고 싶습니다.', answer: '답변 내용'},
                {expanded: 'panel10', type: '문의 및 신고', question:'기능 문제 발생 시 피드백을 보내고 싶습니다.', answer: '답변 내용'},
            ]
        }
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes} = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                {this.state.accordionList.map((list, i) => (
                    <Accordion
                        expanded={expanded === list.expanded}
                        onChange={this.handleChange(list.expanded)}
                        className={list.expanded === 'panel1' ? clsx(classes.accordionBox, classes.accordionBoxTop) : classes.accordionBox}
                    >
                        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                            <Typography className={classes.titleText}>[{list.type}]</Typography>
                            <Typography className={classes.textStyle}>Q. {list.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Typography>
                                {list.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        );
    }
};

export default withStyles(styles)(HelpAccordion);
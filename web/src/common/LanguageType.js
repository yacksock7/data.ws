
export const LanguageType = {
    STT : {
        GOOGLE : [
            {name : "벵골어(방글라데시)", type : "bn_BD"},
            {name : "불가리아어(불가리아)", type : "bg_BG"},
            {name : "체코어(체코)", type : "cs_CZ"},
            {name : "덴마크어(덴마크)", type : "da_DK"},
            {name : "네덜란드어(네덜란드)", type : "nl_NL"},
            {name : "영어(오스트레일리아)", type : "en_AU"},
            {name : "영어(인도)", type : "en_IN"},
            {name : "영어(싱가포르)", type : "en_SG"},
            {name : "영어(영국)", type : "en_GB"},
            {name : "영어(미국)", type : "en_US"},
            {name : "프랑스어(캐나다)", type : "fr_CA"},
            {name : "프랑스어(프랑스)", type : "fr_FR"},
            {name : "독일어(독일)", type : "de_DE"},
            {name : "힌디어(인도)", type : "hi_IN"},
            {name : "인도네시아어(인도네시아)", type : "id_ID"},
            {name : "이탈리아어(이탈리아)", type : "it_IT"},
            {name : "일본어(일본)", type : "ja_JP"},
            {name : "칸나다어(인도)", type : "kn_IN"},
            {name : "크메르어(캄보디아)", type : "km_KH"},
            {name : "한국어(대한민국)", type : "ko_KR"},
            {name : "말라얄람어(인도)", type : "ml_IN"},
            {name : "마라티어(인도)", type : "mr_IN"},
            {name : "포르투갈어(브라질)", type : "pt_BR"},
            {name : "러시아어(러시아)", type : "ru_RU"},
            {name : "키냐르완다어(르완다)", type : "rw_RW"},
            {name : "스와티어(남아프리카 공화국)", type : "ss_latn_za"},
            {name : "남부 소토어(남아프리카 공화국)", type : "st_ZA"},
            {name : "스페인어(스페인)", type : "es_ES"},
            {name : "스페인어(미국)", type : "es_US"},
            {name : "스웨덴어(스웨덴)", type : "sv_SE"},
            {name : "타밀어(인도)", type : "ta_IN"},
            {name : "텔루구어(인도)", type : "te_IN"},
            {name : "츠와나어(남아프리카 공화국)", type : "tn_latn_za"},
            {name : "총가어(남아프리카 공화국)", type : "ts_ZA"},
            {name : "벤다어(남아프리카 공화국)", type : "ve_ZA"},
        ],
        CHAT_GPT : [
            { name : "스페인어", type :"es", wer : "3.0%" },
            { name : "이탈리아어", type :"it", wer : "4.0%" },
            { name : "영어", type :"en", wer : "4.2%" },
            { name : "포르투갈어", type :"pt", wer : "4.3%"},
            { name : "독일어", type :"de", wer : "4.5%" },
            { name : "일본어", type :"ja", wer : "5.3%" },
            { name : "폴란드어" , type :"pl", wer : "5.4%" },
            { name : "러시아어", type :"ru", wer : "5.6%" },
            { name : "네덜란드어", type :"nl", wer : "6.7%" },
            { name : "인도네시아어", type :"id",  wer : "7.1%"},
            { name : "카탈로니아어", type :"ca", wer : "7.3%"},
            { name : "프랑스어", type :"fr", wer : "8.3%" },
            { name : "터키어", type :"tr", wer : "8.4%" },
            { name : "스웨덴어", type :"sv", wer : "8.5%" },
            { name : "우크라이나어", type :"uk", wer : "8.6%" },
            { name : "말레이어", type :"ms", wer : "8.7%" },
            { name : "노르웨이어", type :"no", wer : "9.5%" },
            { name : "핀란드어", type :"fi", wer : "9.7%" },
            { name : "베트남어", type :"vi", wer : "10.3%" },
            { name : "태국어", type :"th", wer : "11.5%" },
            { name : "슬로바키아어", type :"sk", wer : "11.5%" },
            { name : "그리스어", type :"el", wer : "12.5%" },
            { name : "체코어", type :"cs", wer : "13.3%" },
            { name : "크로아티아어", type :"hr", wer : "13.4%" },
            { name : "타갈로그어", type :"tl", wer : "13.8%" },
            { name : "덴마크어", type :"da", wer : "13.8%" },
            { name : "한국어", type :"ko", wer : "14.3%" },
            { name : "루마니아어", type :"ro", wer : "14.4%" },
            { name : "불가리아어", type :"bg", wer : "14.6%" },
            { name : "중국어", type :"zh", wer : "14.7%" },
            { name : "갈리시아어", type :"gl", wer : "15.4%" },
            { name : "보스니아어", type :"bs", wer : "15.7%" },
            { name : "아랍어", type :"ar", wer : "16.0%" },
            { name : "마케도니아어", type :"mk", wer : "16.5%" },
            { name : "헝가리어", type :"hu", wer : "17.0%" },
            { name : "타밀어", type :"ta", wer : "17.5%" },
            { name : "힌디어", type :"hi", wer : "21.5%" },
            { name : "에스토니아어", type :"et", wer : "21.9%" },
            { name : "우르두어", type :"ur", wer : "22.6%" },
            { name : "슬로베니아어", type :"sl", wer : "23.1%" },
            { name : "라트비아어", type :"lv", wer : "23.1%" },
            { name : "아제르바이잔어", type :"az", wer : "23.4%" },
            { name : "히브리어", type :"he", wer : "27.1%" },
            { name : "리투아니아어", type :"lt", wer : "28.1%" },
            { name : "페르시아어", type :"fa", wer : "32.9%" },
            { name : "웨일스어", type :"cy", wer : "33.0%" },
            { name : "세르비아어", type :"sr", wer : "33.9%" },
            { name : "아프리칸스어", type : "af", wer : "36.7%" },
            { name : "칸나다어", type :"kn", wer : "37.0%" },
            { name : "카자흐어", type :"kk", wer : "37.7%" },
            { name : "아이슬란드어", type :"is", wer : "38.2%" },
            { name : "마라티어", type :"mr", wer : "38.3%" },
            { name : "마오리어", type :"mi", wer : "38.5%" },
            { name : "스와힐리어", type :"sw", wer : "39.3%" },
            { name : "아르메니아어", type :"hy", wer : "44.6%" },
            { name : "벨로루시어", type :"be", wer : "45.6%" },
            { name : "네팔어", type :"ne", wer : "47.1%" },
        ]
    },
    Translation : {
        GOOGLE : [
            {name :"아프리칸스어", type : "af"},
            {name :"알바니아어", type : "sq"},
            {name :"암하라어", type : "am"},
            {name :"아랍어", type : "ar"},
            {name :"아르메니아어", type : "hy"},
            {name :"아삼어", type : "as"},
            {name :"아이마라어", type : "ay"},
            {name :"아제르바이잔어", type : "az"},
            {name :"밤바라어", type : "bm"},
            {name :"바스크어", type : "eu"},
            {name :"벨라루스어", type : "be"},
            {name :"벵골어", type : "bn"},
            {name :"보지푸리어", type : "bho"},
            {name :"보스니아어", type : "bs"},
            {name :"불가리아어", type : "bg"},
            {name :"카탈루냐어", type : "ca"},
            {name :"세부아노어", type : "ceb"},
            {name :"중국어(간체)", type : "zh_CN"},
            {name :"중국어(번체)", type : "zh_TW"},
            {name :"코르시카어", type : "co"},
            {name :"크로아티아어", type : "hr"},
            {name :"체코어", type : "cs"},
            {name :"덴마크어", type : "da"},
            {name :"디베히어", type : "dv"},
            {name :"도그리어", type : "doi"},
            {name :"네덜란드어", type : "nl"},
            {name :"영어", type : "en"},
            {name :"에스페란토", type : "eo"},
            {name :"에스토니아어", type : "et"},
            {name :"에웨어", type : "ee"},
            {name :"필리핀어(타갈로그어)", type : "fil"},
            {name :"핀란드어", type : "fi"},
            {name :"프랑스어", type : "fr"},
            {name :"프리지아어", type : "fy"},
            {name :"갈리시아어", type : "gl"},
            {name :"조지아어", type : "ka"},
            {name :"독일어", type : "de"},
            {name :"그리스어", type : "el"},
            {name :"과라니어", type : "gn"},
            {name :"구자라트어", type : "gu"},
            {name :"아이티 크리올어", type : "ht"},
            {name :"하우사어", type : "ha"},
            {name :"하와이어", type : "haw"},
            {name :"히브리어", type : "he"},
            {name :"힌디어", type : "hi"},
            {name :"몽어", type : "hmn"},
            {name :"헝가리어", type : "hu"},
            {name :"아이슬란드어", type : "is"},
            {name :"이보어", type : "ig"},
            {name :"일로카노어", type : "ilo"},
            {name :"인도네시아어", type : "id"},
            {name :"아일랜드", type : "ga"},
            {name :"이탈리아어", type : "it"},
            {name :"일본어", type : "ja"},
            {name :"자바어", type : "jv"},
            {name :"칸나다어", type : "kn"},
            {name :"카자흐어", type : "kk"},
            {name :"크메르어", type : "km"},
            {name :"키냐르완다어", type : "rw"},
            {name :"콘칸어", type : "gom"},
            {name :"한국어", type : "ko"},
            {name :"크리오어", type : "kri"},
            {name :"쿠르드어", type : "ku"},
            {name :"쿠르드어(소라니어)", type : "ckb"},
            {name :"키르기스어", type : "ky"},
            {name :"라오어", type : "lo"},
            {name :"라틴어", type : "la"},
            {name :"라트비아어", type : "lv"},
            {name :"링갈라어", type : "ln"},
            {name :"리투아니아어", type : "lt"},
            {name :"루간다어", type : "lg"},
            {name :"룩셈부르크어", type : "lb"},
            {name :"마케도니아어", type : "mk"},
            {name :"마이틸리어", type : "mai"},
            {name :"말라가시어", type : "mg"},
            {name :"말레이어", type : "ms"},
            {name :"말라얄람어", type : "ml"},
            {name :"몰타어", type : "mt"},
            {name :"마오리어", type : "mi"},
            {name :"마라티어", type : "mr"},
            {name :"메이테이어(마니푸르어)", type : "mni_Mtei"},
            {name :"미조어", type : "lus"},
            {name :"몽골어", type : "mn"},
            {name :"미얀마어(버마어)", type : "my"},
            {name :"네팔어", type : "ne"},
            {name :"노르웨이어", type : "no"},
            {name :"니안자어(치츄어)", type : "ny"},
            {name :"오리야어", type : "or"},
            {name :"오로모어", type : "om"},
            {name :"파슈토어", type : "ps"},
            {name :"페르시아어", type : "fa"},
            {name :"폴란드어", type : "pl"},
            {name :"포르투갈어(포르투갈, 브라질)", type : "pt"},
            {name :"펀자브어", type : "pa"},
            {name :"케추아어", type : "qu"},
            {name :"루마니아어", type : "ro"},
            {name :"러시아어", type : "ru"},
            {name :"사모아어", type : "sm"},
            {name :"산스크리트어", type : "sa"},
            {name :"스코틀랜드 게일어", type : "gd"},
            {name :"북소토어", type : "nso"},
            {name :"세르비아어", type : "sr"},
            {name :"세소토어", type : "st"},
            {name :"쇼나어", type : "sn"},
            {name :"신디어", type : "sd"},
            {name :"스리랑카어(싱할라어)", type : "si"},
            {name :"슬로바키아어", type : "sk"},
            {name :"슬로베니아어", type : "sl"},
            {name :"소말리어", type : "so"},
            {name :"스페인어", type : "es"},
            {name :"순다어", type : "su"},
            {name :"스와힐리어", type : "sw"},
            {name :"스웨덴어", type : "sv"},
            {name :"타갈로그어(필리핀어)", type : "tl"},
            {name :"타지크어", type : "tg"},
            {name :"타밀어", type : "ta"},
            {name :"타타르어", type : "tt"},
            {name :"텔루구어", type : "te"},
            {name :"태국어", type : "th"},
            {name :"티그리냐어", type : "ti"},
            {name :"총가어", type : "ts"},
            {name :"튀르키예어", type : "tr"},
            {name :"투르크멘어", type : "tk"},
            {name :"트위어(아칸어)", type : "ak"},
            {name :"우크라이나어", type : "uk"},
            {name :"우르두어", type : "ur"},
            {name :"위구르어", type : "ug"},
            {name :"우즈베크", type : "uz"},
            {name :"베트남어", type : "vi"},
            {name :"웨일즈어", type : "cy"},
            {name :"코사어", type : "xh"},
            {name :"이디시어", type : "yi"},
            {name :"요루바어", type : "yo"},
            {name :"줄루어", type : "zu"},
        ],
    },
    GrammarCorrector : {

    },
}


import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  MapPin, 
  FileText, 
  Compass, 
  Users, 
  ChevronRight, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertTriangle, 
  Award, 
  History, 
  Edit3, 
  Book, 
  CheckCircle2, 
  Sun, 
  CloudRain, 
  Globe, 
  ArrowRight,
  Sparkles,
  Bookmark
} from 'lucide-react';

// --- DATA DEFINITION ---
const DOCUMENTS_DATA = [
  {
    id: 'sejong',
    category: 'kr',
    title: '세종실록지리지',
    year: '1454년',
    source: '한국 조선 관찬 지리지',
    coreText: '“우산(于山, 독도)과 무릉(武陵, 울릉도) 두 섬이 현의 정동쪽 바다에 있다. 두 섬이 서로 거리가 멀지 않아 날씨가 맑으면 바라볼 수 있다.”',
    desc: '독도의 물리적 가시성(맑은 날 울릉도에서 육안으로 보임)을 최초로 서술하며, 이미 조선 건국 초기에 독도를 인지하고 관할하고 있었음을 명백히 밝혀주는 1차 증거입니다.',
    badge: '가시성 확인'
  },
  {
    id: 'sinjeung',
    category: 'kr',
    title: '신증동국여지승람',
    year: '1531년',
    source: '한국 조선 지리지 및 지도(팔도총도)',
    coreText: '강원도 울진현 조에 우산도와 울릉도가 동해 해상에 뚜렷이 존재하는 두 개의 섬임을 기술하고 부속 지도인 팔도총도를 첨부함.',
    desc: '국가 주도의 인문지리서로 조선 한반도 동해에 두 섬이 명백히 국가 행정 권력 범위 내에 소속되어 있음을 전국적 규모에서 명문화하고 시각화했습니다.',
    badge: '행정 편입'
  },
  {
    id: 'mangi',
    category: 'kr',
    title: '만기요람',
    year: '1808년',
    source: '한국 조선 군정·재정 지침서',
    coreText: '“여지지에 이르기를, 울릉과 우산은 모두 우산국의 땅인데, 우산은 왜인(일본인)들이 말하는 송도(松島)다.”',
    desc: '조선 왕조가 일본이 지칭하던 "송도(松島)"라는 이름까지 명확히 파악하고 있었으며, 그것이 곧 우리의 주권 대상이자 우산국의 고유 영토였던 우산도(독도)임을 규명한 결정적 사료입니다.',
    badge: '명칭 일치'
  },
  {
    id: 'edict41',
    category: 'kr',
    title: '대한제국 칙령 제41호',
    year: '1900년 10월 25일',
    source: '대한제국 근대식 공식 법령',
    coreText: '제2조: “울도군의 관할 구역은 울릉전도, 죽도 및 석도(石島)로 한다.”',
    desc: '독도의 옛 방언인 "돌섬"을 한자로 표기한 "석도"를 관할로 규정했습니다. 이는 일본 시마네현 고시 제40호(1905년)보다 5년이나 앞서 근대 국제법적 요건을 완벽히 갖추고 독도를 행정 구역화했음을 증명합니다.',
    badge: '근대 국제법 주권'
  },
  {
    id: 'onshu',
    category: 'jp',
    title: '은주시청합기',
    year: '1667년',
    source: '일본 시마네현 관리 사이토 호센의 보고서',
    coreText: '“일본의 서북쪽 한계를 오키섬(隱州)으로 삼고, 울릉도(당시 죽도)와 독도(당시 송도)는 고려(조선)의 영토로 본다.”',
    desc: '일본 관리가 직접 기록한 공식 관찬 고문서로, 일본 영토의 서북단 끝을 오키섬으로 한정함으로써 독도와 울릉도가 일본 영토 밖에 위치하는 조선의 영역임을 분명히 자백하고 있습니다.',
    badge: '일본 영토 한계 설정'
  },
  {
    id: 'shimal',
    category: 'jp',
    title: '조선국 교제시말 내탐서',
    year: '1870년',
    source: '일본 메이지 정부 외무성 공식 보고서',
    coreText: '“죽도(울릉도)와 송도(독도)가 조선 영역으로 귀속된 전말을 상세히 보고함.”',
    desc: '메이지 유신 직후 일본 외무성 관리들이 조선의 내정을 탐색하여 작성한 대외 국가 극비 보고서입니다. 일본 외무성 스스로 독도를 조선의 고유 영토로 확실히 분류하고 있음을 명백하게 실토한 증거입니다.',
    badge: '메이지 외무성 보고'
  },
  {
    id: 'daijokan',
    category: 'jp',
    title: '태정관 지령',
    year: '1877년',
    source: '일본 메이지 최고 국가행정기관 지령',
    coreText: '“품의한 죽도(울릉도) 외 일도(一島, 독도)의 건은 본방(일본)과 전혀 관계가 없음을 명심할 것.”',
    desc: '당시 메이지 정부의 최고 통치결정기구인 태정관이 내무성에 공식 하달한 지령으로, 지도(기죽도약도)까지 첨부하며 울릉도와 독도가 일본 영토가 아니라고 단정했습니다. 현대 일본 주장을 완벽히 격파하는 가장 강력한 증거 사료입니다.',
    badge: '국가최고기관 시인'
  }
];

const HISTORIC_MAPS = [
  {
    title: '팔도총도 (1531년)',
    origin: '조선 관찬 지도',
    desc: '한반도 전역을 수록한 고지도로, 동해상에 울릉도와 독도(우산도)를 뚜렷하게 별개의 두 섬으로 그려 넣어 국가 영토에 포함되어 있음을 보여줍니다.',
    isKorean: true,
    highlights: ['동해상 우산도 표기', '조선 공식 편찬']
  },
  {
    title: '개정일본여지로정전도 (1779년)',
    origin: '일본 나가쿠보 세키스이 제작',
    desc: '일본의 대표적인 관선 지도로서 일본 자국 영토는 선명하게 채색한 반면, 울릉도와 독도는 무채색(투명)으로 방치하여 일본 주권권 외 영역임을 드러내고 있습니다.',
    isKorean: false,
    highlights: ['일본 영역만 색칠함', '독도는 하얗게 비워둠']
  },
  {
    title: '삼국접양지도 (1785년)',
    origin: '일본 실학자 하야시 시헤이 제작',
    desc: '조선, 일본, 유구(오키나와), 북방 지역을 색상별로 엄격히 나눈 국제적 역작입니다. 조선 반도와 울릉도, 독도를 동일한 황색(Yellow)으로 칠한 뒤 옆에 한자로 "조선의 것(朝鮮ノ持)"이라고 아주 명확히 표기했습니다.',
    isKorean: false,
    highlights: ['조선과 동일한 노란색', '“조선의 것” 텍스트 명시']
  }
];

const TIMELINE_DATA = [
  {
    year: '1946년 1월',
    title: '연합국최고사령관 지령 (SCAPIN) 제677호',
    desc: '2차 세계대전 직후 연합국 사령부는 일본의 주권 통치 행위를 정지시키며 울릉도, 제주도, 그리고 독도(Liancourt Rocks)를 일본 영토 범위에서 완벽히 배제해 한국에 인도했습니다.',
    status: 'success'
  },
  {
    year: '1951년 9월',
    title: '샌프란시스코 강화조약 체결',
    desc: '최종 조약문 초안 과정에서 일본의 고도 외교 로비로 인해 포기 영토 목록에서 ‘독도’의 단어명이 누락되었습니다. 일본은 이 텍스트의 조약상 누락을 악용해 독도 영유권 억지 주장을 일삼게 되었습니다.',
    status: 'warning'
  },
  {
    year: '1952년 1월',
    title: '이승만 평화선 선포',
    desc: '조약 발효 직전, 이승만 대통령은 한반도 주변의 해양 주권을 확실하게 못 박기 위해 평화선(Rhee Line)을 대외적으로 선포하고 선 내부의 독도를 철저한 주권 영역으로 방어했습니다.',
    status: 'info'
  },
  {
    year: '1953~56년',
    title: '독도의용수비대의 숭고한 결성',
    desc: '6·25 전쟁의 극단적 혼란기를 타 수시로 침범하던 일본 순시선에 맞서, 홍순칠 대장과 울릉도 청년들이 자발적으로 무장 부대를 꾸렸습니다. 가짜 나무 박격포를 세워 위협하는 등의 사투로 영토를 온몸으로 사수했습니다.',
    status: 'success'
  },
  {
    year: '1998년 9월',
    title: '신한일어업협정 체결 (중간수역 지정)',
    desc: '유엔해양법협약 발효로 200해리 배타적 경제수역(EEZ) 중첩이 발생했습니다. 합의 불발 끝에 울릉도와 오키섬 사이에 타협적 완충 지대인 "중간수역"을 임시 설정했고, 이 수역 내에 독도가 존재하게 되며 논쟁이 재발했습니다.',
    status: 'warning'
  },
  {
    year: '2005년~현재',
    title: '다케시마의 날 조례 제정 및 교과서 왜곡',
    desc: '시마네현이 다케시마의 날 조례를 강행 지정한 이후, 일본 중앙정부는 역사 왜곡 교과서 검정을 상설화하여 미래 세대에게 그릇된 영토 야욕을 주입하는 역사 갈등을 극대화하고 있습니다.',
    status: 'danger'
  }
];

const QUIZ_QUESTIONS = [
  {
    question: '울릉도에서 맑은 날 독도를 육안으로 직접 바라볼 수 있다는 사실이 기록된 최초의 고문서는 무엇일까요?',
    options: [
      '세종실록지리지 (1454년)',
      '태정관 지령 (1877년)',
      '만기요람 (1808년)',
      '은주시청합기 (1667년)'
    ],
    correct: 0,
    explanation: '『세종실록지리지』 강원도 울진현 조에는 "우산(독도)과 무릉(울릉도) 두 섬이 서로 거리가 멀지 않아 날씨가 맑으면 바라볼 수 있다"라며 지리적 육안 관측성을 최초로 정밀 명시했습니다.'
  },
  {
    question: '일본 시마네현의 어민들에게 독도로 고기잡이 가던 것을 전면 금지시킨 에도 막부의 ‘도해 금지령’이 발령된 역사적 배경 사건은 무엇일까요?',
    options: [
      '홍순칠의 독도의용수비대 격전',
      '대한제국 칙령 제41호 반포',
      '안용복의 도일(渡日) 및 외교 교섭',
      '연합국 최고사령관 지령 제677호'
    ],
    correct: 2,
    explanation: '조선의 평범한 어부 안용복의 주도적인 도일 항의 투쟁과 이에 따른 돗토리번의 "독도는 우리 땅이 아니다"라는 고백 이후, 에도 막부는 1696년 공식 도해 금지령을 제정하여 분쟁을 조선령 인정으로 종식했습니다.'
  },
  {
    question: '메이지 유신 시절인 1877년, 최고 국가기관이었던 ‘태정관’이 울릉도와 독도에 관해 하달한 국가 공식 지령의 요지는 무엇인가요?',
    options: [
      '울릉도와 독도는 일본 시마네현 관할이다.',
      '울릉도와 독도는 일본과 하등 관계가 없는 조선의 영토다.',
      '울릉도 주변 12해리만 한국의 영해이다.',
      '독도는 공동으로 고기잡이를 하는 중간 구역이다.'
    ],
    correct: 1,
    explanation: '태정관 지령은 "품의한 울릉도 외 1도의 건(독도)은 일본과 전혀 상관이 없음을 명심할 것"이라며 독도가 자국 영토가 아님을 확실하게 시인한 최고 권위적 결정입니다.'
  },
  {
    question: '1900년 고종 황제가 반포하여 울릉도를 군으로 격상하고 관할 구역에 독도(석도)를 명확히 포함하여 일본의 1905년 무단 편입 시도보다 앞섰던 법령은 무엇인가요?',
    options: [
      '신증동국여지승람',
      '대한제국 칙령 제41호',
      '연합국최고사령관 지령 제677호',
      '샌프란시스코 평화 조약'
    ],
    correct: 1,
    explanation: '1900년 10월 25일에 공포된 대한제국 칙령 제41호는 석도(독도)를 국가 공식 지방관 관할로 엄정 배속함으로써 국제법상 실효적 지배를 성립시켰습니다.'
  },
  {
    question: '1998년 체결되었으며, 200해리 배타적 경제수역(EEZ)이 서로 겹쳐 합의를 도출하지 못하자 임시방편으로 두 국가가 공동 관리하는 구역을 설정한 조약은?',
    options: [
      '이승만 평화선 조약',
      '한일기본조약',
      '샌프란시스코 강화조약',
      '신한일어업협정'
    ],
    correct: 3,
    explanation: '1998년 신한일어업협정에서 울릉도와 오키섬을 기점으로 경계를 조율하던 중 타협이 무산되어 중간수역이 만들어졌고, 독도가 이 중간수역에 놓이면서 분쟁 요인이 현대에 재점화되었습니다.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('chap1'); // chap1, chap2, chap3, chap4, quiz
  
  // Chapter 1 States
  const [weatherIsSunny, setWeatherIsSunny] = useState(true);
  const [selectedTerritory, setSelectedTerritory] = useState('all');

  // Chapter 2 States
  const [selectedDocId, setSelectedDocId] = useState('sejong');
  const [mapSearch, setMapSearch] = useState('all'); // all, kr, jp

  // Chapter 4 (Activity) States
  const [studentKo, setStudentKo] = useState('');
  const [studentJa, setStudentJa] = useState('');
  const [proposedTitle, setProposedTitle] = useState('');
  const [essayBody, setEssayBody] = useState('');
  const [hasSubmittedBook, setHasSubmittedBook] = useState(false);
  const [evalGrade, setEvalGrade] = useState(null);
  
  // Discussion Answers
  const [discussAnswers, setDiscussAnswers] = useState({
    q1: '',
    q2: '',
    q3: ''
  });
  const [savedDiscussions, setSavedDiscussions] = useState(false);

  // Quiz States
  const [quizSelections, setQuizSelections] = useState(Array(QUIZ_QUESTIONS.length).fill(null));
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Computed Doc Active
  const activeDoc = useMemo(() => {
    return DOCUMENTS_DATA.find(d => d.id === selectedDocId) || DOCUMENTS_DATA[0];
  }, [selectedDocId]);

  // Quiz calculations
  const quizScore = useMemo(() => {
    return quizSelections.reduce((acc, sel, idx) => {
      if (sel === QUIZ_QUESTIONS[idx].correct) return acc + 1;
      return acc;
    }, 0);
  }, [quizSelections]);

  const handleQuizSelect = (qIdx, oIdx) => {
    if (showQuizResults) return;
    const nextSels = [...quizSelections];
    nextSels[qIdx] = oIdx;
    setQuizSelections(nextSels);
  };

  const resetQuiz = () => {
    setQuizSelections(Array(QUIZ_QUESTIONS.length).fill(null));
    setShowQuizResults(false);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!studentKo || !studentJa || !proposedTitle || !essayBody) {
      alert("공동 작성자, 제안 단원 제목, 본문을 모두 작성해 주셔야 합니다.");
      return;
    }
    setHasSubmittedBook(true);
    
    // Simple heuristic-based automated evaluation
    const lengthValid = essayBody.length >= 100 && essayBody.length <= 600;
    const containsSejong = essayBody.includes('세종실록') || essayBody.includes('지리지') || essayBody.includes('1454');
    const containsDaijokan = essayBody.includes('태정관') || essayBody.includes('지령') || essayBody.includes('1877');
    const containsPeace = essayBody.includes('평화') || essayBody.includes('상생') || essayBody.includes('공동') || essayBody.includes('협력');
    
    let grade = 'B';
    let feedback = '';
    
    if (lengthValid && (containsSejong || containsDaijokan) && containsPeace) {
      grade = 'A+';
      feedback = '훌륭합니다! 한·일 간 고문서 증거 사료를 명확하게 활용하였으며 감정 서술을 절제하고 객관적 진실 및 평화지향적 대안을 완벽하게 진술하셨습니다.';
    } else if (lengthValid && (containsSejong || containsDaijokan)) {
      grade = 'A';
      feedback = '좋은 서술입니다. 사료 근거는 잘 활용되었으나, 향후 갈등 해결을 위한 평화 공동체 관점이 조금 더 서술되면 한층 완벽해질 것 같습니다.';
    } else if (essayBody.length > 30) {
      grade = 'B';
      feedback = '교과서 형식에 맞게 서술되었습니다. 다만 세종실록지리지나 태정관지령 같은 역사 사료 2개 이상을 본문에 직접 언급하여 주장의 객관적 정합성을 더 높여 보세요.';
    } else {
      grade = 'C';
      feedback = '분량이 부족하거나 제시된 조건(사료 삽입, 평화 지향)을 충족하지 못했습니다. 더 많은 정보와 평화 메시지를 추가해 작성해 보세요.';
    }

    setEvalGrade({ grade, feedback });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-sky-200">
      
      {/* HEADER BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border-b border-sky-900/30">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-sky-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">교재 연동형 실습</span>
              <span className="text-slate-400 text-sm">중·고등 역사-지리 융합 수업 보조 플랫폼</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-white via-sky-100 to-indigo-200 bg-clip-text text-transparent">
              독도 영토 주권 교육 종합 교재
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              감정적 논란을 뛰어넘어, 정확한 1차 역사 사료와 물리적 지리 정보로 실증하고 동아시아의 평화적 공존 방안을 탐구합니다.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/10 shrink-0">
            <Globe className="w-10 h-10 text-sky-400 animate-spin-slow" />
            <div className="text-xs">
              <p className="font-semibold text-white">대한민국 역사·지리 평화교육위원회</p>
              <p className="text-slate-300">2026 에디션 보완판</p>
            </div>
          </div>
        </div>
      </header>

      {/* CORE NAVIGATION */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 py-3 min-w-[640px]" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('chap1')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'chap1' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>1차시. 지리와 영역</span>
            </button>

            <button
              onClick={() => setActiveTab('chap2')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'chap2' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>2차시. 사료와 지도</span>
            </button>

            <button
              onClick={() => setActiveTab('chap3')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'chap3' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <History className="w-4 h-4" />
              <span>3차시. 현대 갈등과 조약</span>
            </button>

            <button
              onClick={() => setActiveTab('chap4')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'chap4' 
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>수업 활동지 & 토론</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'quiz' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>독도 복습 골든벨</span>
            </button>
          </nav>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* ==================== CHAPTER 1: GEOGRAPHY ==================== */}
        {activeTab === 'chap1' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Intro Alert */}
            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-xl flex gap-3 items-start">
              <Compass className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sky-900 font-bold">1차시 요약: "독도는 동해 바다에 유기적으로 상존하는 우리 영토입니다."</h3>
                <p className="text-sky-700 text-sm mt-1">
                  위도와 면적, 그리고 주변 영토와의 거리를 수학적·과학적으로 비교해 봅니다. 특히 울릉도에서의 육안 가시성과 일본 오키섬에서의 가시 불가능성을 직접 조작하며 이해해 보세요.
                </p>
              </div>
            </div>

            {/* Sub-grid 1: Distances & Interactive Visibility Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Map & Distance Simulator (Left 7 cols) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">시뮬레이터</span>
                      <h2 className="text-xl font-bold text-slate-950 mt-0.5">울릉도 vs 오키섬: 가시성 및 기하학적 거리 측정</h2>
                    </div>
                    {/* Weather Toggle */}
                    <button
                      onClick={() => setWeatherIsSunny(!weatherIsSunny)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        weatherIsSunny 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {weatherIsSunny ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <CloudRain className="w-3.5 h-3.5 text-blue-500" />}
                      기상상태: {weatherIsSunny ? '쾌청함 (맑음)' : '흐림/해무 발생'}
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    지구의 곡률로 인해 빛의 굴절과 장애 여부가 달라집니다. 아래 지도 모델에서 각 지역과 독도 간의 실제 거리를 비교하고 가시 반경을 켜보세요.
                  </p>
                </div>

                {/* SVG Visual Model */}
                <div className="my-6 bg-slate-900 rounded-xl p-4 relative overflow-hidden h-72 border border-slate-800">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-25"></div>
                  
                  {/* Compass Card Background decoration */}
                  <div className="absolute top-4 right-4 text-slate-700 font-mono text-[10px] space-y-0.5">
                    <p>WGS84 COORDINATES</p>
                    <p>DOKDO: 37°14′26.8"N, 131°52′10.4"E</p>
                  </div>

                  {/* Ocean Gradient Map Element */}
                  <svg className="w-full h-full" viewBox="0 0 600 240">
                    {/* Landmass 1: Korea Mainland (Uljin) */}
                    <g transform="translate(30, 110)">
                      <circle r="22" className="fill-slate-800 stroke-slate-700 stroke-2" />
                      <path d="M-15,-10 C-5,-20 15,-15 15,10 C15,20 -5,25 -15,15 Z" className="fill-emerald-800/80 stroke-emerald-700" />
                      <text y="30" className="fill-slate-300 text-[10px] font-bold text-center" textAnchor="middle">한반도 (울진 죽변)</text>
                    </g>

                    {/* Landmass 2: Ulleungdo */}
                    <g transform="translate(200, 90)">
                      <circle r="15" className="fill-slate-800/40" />
                      <polygon points="-10,-8 10,-12 12,10 -8,10" className="fill-emerald-600 stroke-emerald-500" />
                      <text y="24" className="fill-slate-200 text-[11px] font-bold" textAnchor="middle">울릉도</text>
                      {/* Sa-dong high ground observer */}
                      <circle cx="2" cy="-4" r="2.5" className="fill-red-500 animate-ping" />
                      <circle cx="2" cy="-4" r="1.5" className="fill-red-500" />
                    </g>

                    {/* Landmass 3: Dokdo */}
                    <g transform="translate(360, 100)">
                      <circle r="8" className="fill-sky-500/20" />
                      {/* East & West islands represented */}
                      <polygon points="-5,0 0,-7 3,-2" className="fill-amber-400 stroke-amber-500" />
                      <polygon points="1,-2 4,-8 8,0" className="fill-amber-300 stroke-amber-500" />
                      <text y="20" className="fill-amber-300 text-[11px] font-bold" textAnchor="middle">독도</text>
                    </g>

                    {/* Landmass 4: Oki Island (Japan) */}
                    <g transform="translate(500, 180)">
                      <circle r="16" className="fill-slate-800/40" />
                      <ellipse cx="0" cy="0" rx="14" ry="10" className="fill-slate-700 stroke-slate-600" />
                      <text y="24" className="fill-slate-400 text-[11px] font-bold" textAnchor="middle">일본 오키섬</text>
                    </g>

                    {/* CONNECTIONS & DISTANCES */}
                    {/* 1. Uljin - Dokdo Line */}
                    <line x1="45" y1="120" x2="350" y2="100" stroke="#475569" strokeDasharray="4 4" strokeWidth="1.5" />
                    <text x="180" y="135" className="fill-slate-400 text-[10px]" textAnchor="middle">216.8 km</text>

                    {/* 2. Ulleungdo - Dokdo Line (Main target) */}
                    <path d="M210,92 Q285,90 350,98" fill="none" stroke={weatherIsSunny ? "#38bdf8" : "#64748b"} strokeWidth={weatherIsSunny ? "2.5" : "1"} className={weatherIsSunny ? "animate-pulse" : ""} />
                    <text x="280" y="80" className={`text-[11px] font-extrabold ${weatherIsSunny ? 'fill-sky-400' : 'fill-slate-400'}`} textAnchor="middle">87.4 km</text>

                    {/* 3. Oki - Dokdo Line */}
                    <path d="M490,172 Q430,135 370,105" fill="none" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="445" y="145" className="fill-rose-400 text-[11px] font-bold" textAnchor="middle">157.5 km</text>

                    {/* Visibility Fields (Ray) */}
                    {weatherIsSunny ? (
                      <>
                        {/* Ulleungdo to Dokdo visible ray */}
                        <polygon points="202,86 360,95 360,105 202,94" className="fill-sky-500/10 stroke-sky-400/20" strokeWidth="0.5" />
                        <text x="280" y="115" className="fill-sky-300 text-[9px] font-semibold" textAnchor="middle">육안 관측 가능 (가시거리 한계 내)</text>
                        
                        {/* Oki to Dokdo invisible curve indicator */}
                        <path d="M490,172 L420,138" stroke="#ef4444" strokeWidth="2" />
                        {/* Earth curve blockage line */}
                        <path d="M420,138 Q390,128 360,100" stroke="#334155" strokeWidth="1.5" strokeDasharray="2 2" />
                        <circle cx="420" cy="138" r="3" className="fill-red-500" />
                        <text x="460" y="125" className="fill-red-400 text-[9px] font-bold" textAnchor="middle">지구 곡률 한계선 차단!</text>
                        <text x="460" y="135" className="fill-slate-500 text-[8px]" textAnchor="middle">(날씨 맑아도 관측 절대 불가)</text>
                      </>
                    ) : (
                      <>
                        <text x="280" y="115" className="fill-slate-500 text-[9px]" textAnchor="middle">해무로 인한 가시성 제한</text>
                      </>
                    )}
                  </svg>

                  {/* Simulated Floating Alert */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-2 rounded-lg text-[10px] text-slate-300 max-w-[240px] space-y-1">
                    <p className="font-bold text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                      지리적 육안 관측성의 진실
                    </p>
                    <p>
                      울릉도 고지대에서는 독도가 늘 인지 범위 내에 있어 영토의 자각이 역사 이전부터 이루어졌으나, 오키섬에서는 과학적으로 절대 볼 수 없습니다.
                    </p>
                  </div>
                </div>

                {/* Stat badges */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-center p-2 border-r border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">동도 최고봉 좌표</p>
                    <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">북위 37°14′26.8"</p>
                  </div>
                  <div className="text-center p-2 border-r border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">총 면적 (서울 잠실 2배)</p>
                    <p className="text-xs sm:text-sm font-black text-sky-600 mt-0.5">187,554 m²</p>
                  </div>
                  <div className="text-center p-2">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">부속 바위섬 개수</p>
                    <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">89개 섬</p>
                  </div>
                </div>
              </div>

              {/* Territory Elements & Roadmap (Right 5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">국제법과 국가 영역</span>
                  <h2 className="text-xl font-bold text-slate-950 mt-0.5">국가 영역의 3요소와 독도</h2>
                  <p className="text-sm text-slate-500 mt-2">
                    주권이 미치는 영토, 영해, 영공의 정확한 국제법적 기준을 클릭하여 독도의 법적 지위를 확인해 보세요.
                  </p>

                  <div className="space-y-3 mt-5">
                    {/* TAB Button - ALL */}
                    <button
                      onClick={() => setSelectedTerritory('all')}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedTerritory === 'all'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">전체 영역 한눈에 보기</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>

                    {/* TAB Button - LAND */}
                    <button
                      onClick={() => setSelectedTerritory('land')}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedTerritory === 'land'
                        ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/10'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          <span className="font-bold text-sm">영토 (Territory)</span>
                        </div>
                        <span className="text-xs opacity-80">경북 울릉군 독도리 1-96번지</span>
                      </div>
                    </button>

                    {/* TAB Button - SEA */}
                    <button
                      onClick={() => setSelectedTerritory('sea')}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedTerritory === 'sea'
                        ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/10'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                          <span className="font-bold text-sm">영해 (Territorial Sea)</span>
                        </div>
                        <span className="text-xs opacity-80">영해 기선 12해리 수역</span>
                      </div>
                    </button>

                    {/* TAB Button - AIR */}
                    <button
                      onClick={() => setSelectedTerritory('air')}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedTerritory === 'air'
                        ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/10'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                          <span className="font-bold text-sm">영공 (Airspace)</span>
                        </div>
                        <span className="text-xs opacity-80">독도 수직 상공 (KADIZ 포함)</span>
                      </div>
                    </button>

                    {/* TAB Button - EEZ */}
                    <button
                      onClick={() => setSelectedTerritory('eez')}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedTerritory === 'eez'
                        ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/10'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                          <span className="font-bold text-sm">배타적 경제수역 (EEZ)</span>
                        </div>
                        <span className="text-xs opacity-80">기선 200해리 경제권한 수역</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Territory Description Panel */}
                <div className="mt-6 p-4 rounded-xl bg-slate-900 text-slate-200 min-h-36 flex flex-col justify-between border border-slate-800">
                  {selectedTerritory === 'all' && (
                    <div>
                      <p className="text-xs text-sky-400 font-bold uppercase tracking-wider">통합 안내</p>
                      <h4 className="font-bold text-white text-base mt-1">대한민국의 확고한 실효적 영토 지배</h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        대한민국은 행정, 치안, 군사(방공), 경제 전 영역에 걸쳐 독도를 수호하고 있습니다. 개별 탭을 클릭하여 각 영역 구분의 기준과 주권 행사 상태를 확인해 보세요.
                      </p>
                    </div>
                  )}

                  {selectedTerritory === 'land' && (
                    <div>
                      <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">주권 수호 영토</p>
                      <h4 className="font-bold text-white text-base mt-1">행정구역 "경상북도 울릉군 울릉읍 독도리"</h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        지표의 범위로서, 독도는 대한민국 행정망에 철저히 편입된 고유 행정 영토입니다. 주민숙소와 등대, 주민들이 항시 상주하며 실효적으로 행정권을 관할하고 있습니다.
                      </p>
                    </div>
                  )}

                  {selectedTerritory === 'sea' && (
                    <div>
                      <p className="text-xs text-sky-400 font-bold uppercase tracking-wider">완전 주권 수역</p>
                      <h4 className="font-bold text-white text-base mt-1">기선으로부터 12해리 (약 22.2 km)</h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        영해 법령에 따라 독도 주변 12해리는 영토에 준하는 완전한 주권 해역입니다. 대한민국 해경과 군이 항시 초계하며 외부 침범 세력과 불법 불조업선을 차단하고 단속하는 구역입니다.
                      </p>
                    </div>
                  )}

                  {selectedTerritory === 'air' && (
                    <div>
                      <p className="text-xs text-purple-400 font-bold uppercase tracking-wider">영공권 및 공중 지배</p>
                      <h4 className="font-bold text-white text-base mt-1">독도 영토와 영해의 수직 상공 전체</h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        영토와 영해 상공의 대기권 영역입니다. 독도의 상공은 대한민국 한국방공식별구역(KADIZ)에 확고히 설정되어 있으며, 공군 전투기가 엄격히 감시 비행하는 자주 영공입니다.
                      </p>
                    </div>
                  )}

                  {selectedTerritory === 'eez' && (
                    <div>
                      <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">자원 및 경제 권리 수역</p>
                      <h4 className="font-bold text-white text-base mt-1">영해 기선 외곽 최대 200해리 수역</h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        연안국에 천연 자원(메탄하이드레이트 등)의 탐사, 보존, 어업 자원 개발 및 어로 감독 권한을 부여하는 경제적 권리 중심의 수역입니다. 한·일 간에 중첩된 구역입니다.
                      </p>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
                    <span>* 1해리 = 1,852 m 기준 산정</span>
                    <span className="font-bold text-slate-400">국제법적 실효 주권 확보</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-grid 2: Address & Road Names System */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm border border-slate-800">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-sky-400 tracking-wider uppercase">실제 유인도 및 주민의 삶</span>
                  <h3 className="text-xl font-bold mt-1">독도의 도로명 주소와 이정표</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    독도는 무인 바위섬이 아닙니다. 엄연히 상주민과 수비대원이 전입신고를 마치고 편지가 오고가는 유인도입니다.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold">동도: 이사부길</span>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold">서도: 안용복길</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-sky-400">동도 (East Island)</span>
                    <span className="text-[10px] text-slate-500">면적: 73,297 m²</span>
                  </div>
                  <h4 className="font-bold text-white text-base mt-1">울릉읍 독도리 이사부길</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    동해 바다를 개척해 우산국을 신라 영토에 최초로 복속(지증왕 13년, 512년)시킨 신라 장군 이사부의 위업을 기려 동도 주 도로에 "이사부길"이 공식 제정되었습니다. 이곳에는 <strong>독도경비대, 독도등대, 한반도 바위</strong>가 위치해 영토 방위의 구심적 역할을 합니다.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-amber-400">서도 (West Island)</span>
                    <span className="text-[10px] text-slate-500">면적: 88,740 m²</span>
                  </div>
                  <h4 className="font-bold text-white text-base mt-1">울릉읍 독도리 안용복길</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    17세기 왜민의 무단 어로를 단죄하고 일본 막부로부터 공식 인정을 받아낸 민간 영웅 안용복의 주체적 헌신을 기려 "안용복길"로 명명했습니다. 서도에는 거센 바다 생활의 안식처가 되는 <strong>주민숙소</strong>와 유일한 귀중한 식수원인 <strong>'물골'</strong>이 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== CHAPTER 2: HISTORICAL EVIDENCE ==================== */}
        {activeTab === 'chap2' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Intro Header */}
            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-xl flex gap-3 items-start">
              <FileText className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sky-900 font-bold">2차시 요약: "교차 검증된 1차 역사적 사료의 힘"</h3>
                <p className="text-sky-700 text-sm mt-1">
                  역사 영유권 논박은 일시적 비난과 우김이 아닌 철저한 역사적 공문서와 정밀한 고지도 대조를 통해 증명됩니다. 한·일 양국의 고문헌 대조 돋보기를 조작해 직접 역사적 팩트를 검증하세요.
                </p>
              </div>
            </div>

            {/* Document Explorer (Interactive Grid) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">문헌 검증 센터</span>
                <h2 className="text-xl font-bold text-slate-950 mt-0.5">한·일 양국 공식 고문서 대조 분석기</h2>
                <p className="text-sm text-slate-500 mt-1">
                  아래 사료 탭을 클릭하면 대한민국 영유권 증명서와 이에 더해 일본 스스로 독도를 남의 나라 영역으로 배제한 핵심 고백 문헌을 열람할 수 있습니다.
                </p>
              </div>

              {/* Docs Grid selection & Detailed preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                
                {/* Left side: Docs Selection (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">대한민국 왕조 실록 및 근대 법령</h3>
                    <div className="space-y-2">
                      {DOCUMENTS_DATA.filter(d => d.category === 'kr').map(doc => (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDocId(doc.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex justify-between items-center ${
                            selectedDocId === doc.id
                            ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/10'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <div>
                            <span className="block font-bold text-xs opacity-75">{doc.year}</span>
                            <span className="block mt-0.5">{doc.title}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            selectedDocId === doc.id ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>{doc.badge}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-3">일본 관찬 고문서의 고백 (영토 배제 증거)</h3>
                    <div className="space-y-2">
                      {DOCUMENTS_DATA.filter(d => d.category === 'jp').map(doc => (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDocId(doc.id)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex justify-between items-center ${
                            selectedDocId === doc.id
                            ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/10'
                            : 'bg-rose-50 hover:bg-rose-100 text-slate-700 border-rose-200'
                          }`}
                        >
                          <div>
                            <span className="block font-bold text-xs text-rose-400">{doc.year}</span>
                            <span className="block mt-0.5 text-slate-800 font-bold">{doc.title}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            selectedDocId === doc.id ? 'bg-rose-800 text-white' : 'bg-rose-200 text-rose-800'
                          }`}>{doc.badge}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Selected Document Detail (7 cols) */}
                <div className="lg:col-span-7 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        activeDoc.category === 'kr' ? 'bg-sky-500/20 text-sky-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {activeDoc.category === 'kr' ? '대한민국 공식 관찬 사료' : '일본 관찬 공식 고백 사료'}
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">{activeDoc.year} 편찬</span>
                    </div>

                    <h3 className="text-2xl font-black text-white mt-3">{activeDoc.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">출처 및 소속: {activeDoc.source}</p>

                    {/* Historical Quote Box */}
                    <div className="bg-slate-950/80 border-l-4 border-amber-500 p-4 rounded-r-lg my-5 relative">
                      <span className="absolute top-1 right-2 text-6xl text-slate-800 font-serif leading-none select-none">“</span>
                      <p className="text-sm font-medium text-amber-100 leading-relaxed relative z-10">
                        {activeDoc.coreText}
                      </p>
                    </div>

                    {/* Scientific Significance */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">사료해석 및 역사학적 의미</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {activeDoc.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">DOCUMENT ID: DOC_HIST_{activeDoc.id.toUpperCase()}</span>
                    <span className="text-xs text-amber-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-amber-400" />
                      역사왜곡 극복 결정적 사료
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Historic Map Comparison (3 cards layout with search filter) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">고지도의 가시성 분석</span>
                  <h2 className="text-xl font-bold text-slate-950 mt-0.5">역사적 지도(Map) 대조 분석</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    동해 바다의 영유권 영토 지도가 각 국가별로 어떻게 시각적으로 규정되고 묘사되었는지 핵심 지도의 기록을 통해 살펴봅니다.
                  </p>
                </div>

                <div className="flex gap-1.5 shrink-0">
                  <button 
                    onClick={() => setMapSearch('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mapSearch === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    전체
                  </button>
                  <button 
                    onClick={() => setMapSearch('kr')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mapSearch === 'kr' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    조선 지도
                  </button>
                  <button 
                    onClick={() => setMapSearch('jp')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mapSearch === 'jp' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    일본 지도
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {HISTORIC_MAPS.filter(m => {
                  if (mapSearch === 'all') return true;
                  if (mapSearch === 'kr') return m.isKorean;
                  if (mapSearch === 'jp') return !m.isKorean;
                  return true;
                }).map((map, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all duration-200">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          map.isKorean ? 'bg-sky-50 text-sky-600 border border-sky-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {map.origin}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{map.title}</h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {map.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200 space-y-1.5">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">주요 검증 포인트</p>
                      <div className="flex flex-wrap gap-1">
                        {map.highlights.map((h, hIdx) => (
                          <span key={hIdx} className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded">
                            🔍 {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Section: Ahn Yong-bok Case */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-sm border border-indigo-900/30">
              <div className="flex items-center gap-3">
                <Bookmark className="w-6 h-6 text-sky-400" />
                <h3 className="text-xl font-extrabold">안용복 사건과 한·일 외교 교섭 (17세기 후반)</h3>
              </div>
              <p className="text-slate-300 text-sm mt-2 max-w-4xl leading-relaxed">
                평범한 조선 어민 안용복은 어로 영역 분쟁 중 강제로 납치된 위기를 역설적으로 기회로 삼아, 일본 호키주 주정부(막부 관할)에 직접 항의하고 강력히 국경 경계를 다투어 에도 막부의 독도·울릉도 주권 불인정 답변을 이끌어냈습니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-sky-400 block">1차 도일 (1693)</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    울릉도에서 울진 불법 침범 어민들에게 나포 당한 뒤 국경선 주장을 논정하며, 에도막부 당국이 울릉도가 조선령임을 인식하는 계기를 촉발했습니다.
                  </p>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-sky-400 block">돗토리번 답변 (1695)</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    에도 막부가 영유 자문 서신을 보내자 돗토리 번주는 "죽도(울릉도)와 송도(독도)는 저희 번의 소유지가 아닙니다"라고 공식 한계를 인정했습니다.
                  </p>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-sky-400 block">도해 금지령 (1696.1)</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    이에 따라 에도 막부는 일본 모든 주민의 울릉도 방면 출해 및 벌목 선박 이동 금지령을 전격 반포하며 국경 침범을 범죄화했습니다.
                  </p>
                </div>
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-sky-400 block">2차 도일 (1696.5)</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    안용복이 재차 무단 침범한 왜선들을 구축하고 호키주 태수에게 항의, "울릉자산양도감세장"을 칭하며 조선 주권을 수호하고 관리를 확약받았습니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================== CHAPTER 3: MODERN TRANSITION ==================== */}
        {activeTab === 'chap3' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Intro Alert */}
            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-xl flex gap-3 items-start">
              <History className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sky-900 font-bold">3차시 요약: "현대 동아시아 갈등의 씨앗과 평화적 해결책"</h3>
                <p className="text-sky-700 text-sm mt-1">
                  태평양 전쟁 패망 후 연합국 조치를 통한 영토 반환 과정의 명문화 누락, 주권 방어 노력인 평화선 및 독도의용수비대의 헌신, 그리고 유엔해양법 발효로 빚어진 한·일 어업협정과 현대 갈등을 타임라인을 통해 탐색합니다.
                </p>
              </div>
            </div>

            {/* Vertical Interactive Timeline */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="border-b border-slate-200 pb-4 mb-8">
                <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">조약과 수비대 연혁</span>
                <h2 className="text-xl font-bold text-slate-950 mt-0.5">전후 영토 처리와 독도 갈등의 재구성</h2>
                <p className="text-sm text-slate-500 mt-1">
                  1946년부터 최근에 이르는 역대 주요 사건들을 시간의 순서대로 정렬하여 어떤 정치·국제법적 타협이 이루어졌는지 추적해 봅니다.
                </p>
              </div>

              {/* TIMELINE VIEW */}
              <div className="relative border-l border-slate-200 ml-4 md:ml-32 space-y-8">
                {TIMELINE_DATA.map((item, index) => (
                  <div key={index} className="relative pl-6 md:pl-8 group">
                    
                    {/* Floating Year badge on Left for Larger Screens */}
                    <div className="hidden md:block absolute -left-32 top-1 w-24 text-right text-sm font-black text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                      {item.year}
                    </div>

                    {/* Timeline circle node */}
                    <span className={`absolute -left-3 top-2.5 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow ${
                      item.status === 'success' ? 'bg-emerald-500' :
                      item.status === 'warning' ? 'bg-amber-500' :
                      item.status === 'info' ? 'bg-sky-500' : 'bg-red-500'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </span>

                    {/* Timeline card */}
                    <div className="bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all duration-200 p-5 rounded-xl border border-slate-200">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                        {/* Year for Mobile */}
                        <span className="md:hidden text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded w-fit">
                          {item.year}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-base">{item.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* In-depth Box: San Francisco Treaty Dilemma */}
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <h3 className="text-lg font-bold text-amber-950">샌프란시스코 강화조약 텍스트 왜곡 주장의 팩트체크</h3>
              </div>
              <div className="mt-3 text-sm text-amber-900 leading-relaxed space-y-2">
                <p>
                  <strong>일본의 일방적 억지:</strong> 일본 외무성은 조약 제2조 (a)항 "제주도, 거문도, 울릉도를 포함한 한국의 권리를 포기한다"라는 조문 구절에 ‘독도’의 명칭이 없다는 이유를 들어, 독도가 포기되지 않았다고 선동합니다.
                </p>
                <p className="font-bold">
                  역사적 진실과 국제법적 상식:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
                  <li>조서에 언급된 세 섬은 대한민국 3천여 개의 섬 중 극히 일부 대표적인 대형 도서의 예시일 뿐입니다.</li>
                  <li>모든 무인도 바위섬의 이름을 조약 전문에 기록하는 것은 관습상 불가능하며, 울릉도의 대표적 부속도서인 독도는 당연히 포기 도서에 묵시적으로 귀속됩니다.</li>
                  <li>이미 1946년 연합국 최고사령관 지령(SCAPIN 677호)을 통해 독도는 일본 통치 범위 밖의 대한민국 고유 자산으로 영속 분리 및 확약되어 환수되었습니다.</li>
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* ==================== CHAPTER 4: STUDENT WORKSHEET & FORUMS ==================== */}
        {activeTab === 'chap4' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Guide Info */}
            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded-r-xl flex gap-3 items-start">
              <Users className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sky-900 font-bold">수업 활동실: "한·일 양국 청소년 공동의 독도 역사 교과서 서술하기"</h3>
                <p className="text-sky-700 text-sm mt-1">
                  왜곡된 자국중심주의나 감정적 적대 대립을 극복해 보고, 한일 양국의 중·고등학생들이 공동 교과서를 집필한다고 가정하고 객관적 사실에 기반한 한 단원을 직접 저술해 봅니다.
                </p>
              </div>
            </div>

            {/* Interactive Form & Live Open-Book Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Writer Form (Left 5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-sky-500" />
                  교과서 단원 기획 및 본문 작성
                </h3>

                <form onSubmit={handleBookSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">한국 모둠 대표 학생</label>
                      <input 
                        type="text" 
                        value={studentKo}
                        onChange={(e) => setStudentKo(e.target.value)}
                        placeholder="이름을 적어주세요"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">일본 공동 학생 (가상)</label>
                      <input 
                        type="text" 
                        value={studentJa}
                        onChange={(e) => setStudentJa(e.target.value)}
                        placeholder="예: 사토 하루토"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">우리가 정하는 독도 단원의 제목</label>
                    <input 
                      type="text" 
                      value={proposedTitle}
                      onChange={(e) => setProposedTitle(e.target.value)}
                      placeholder="예: 역사로 직시하고 미래로 공존하는 동해의 섬 독도"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-slate-500">본문 공동 집필 (10줄 이내 서술형)</label>
                      <span className={`text-[10px] font-bold ${essayBody.length > 500 ? 'text-rose-500' : 'text-slate-400'}`}>
                        {essayBody.length} / 600자 권장
                      </span>
                    </div>
                    <textarea 
                      rows={8}
                      value={essayBody}
                      onChange={(e) => setEssayBody(e.target.value)}
                      placeholder="이곳에 교본 서술을 제안하세요. 최소 2개 이상의 사료명(세종실록지리지, 태정관지령 등)을 언급하며 평화와 상생의 방향으로 서술해 주세요."
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50 leading-relaxed resize-none"
                    ></textarea>
                    
                    <div className="mt-1 flex flex-wrap gap-1">
                      <button 
                        type="button" 
                        onClick={() => setEssayBody(prev => prev + " 세종실록지리지")}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded"
                      >
                        + 세종실록지리지 추가
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setEssayBody(prev => prev + " 태정관 지령")}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded"
                      >
                        + 태정관 지령 추가
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setEssayBody(prev => prev + " 평화공동체와 조화")}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded"
                      >
                        + 평화 메시지 추가
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-900 text-white hover:bg-slate-850 p-3 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    교과서 인쇄 및 모의 평가 제출
                  </button>
                </form>
              </div>

              {/* Live Book Preview (Right 7 cols) */}
              <div className="lg:col-span-7 bg-amber-50/50 p-6 sm:p-8 rounded-3xl border border-amber-900/10 flex flex-col justify-between shadow-inner relative overflow-hidden">
                {/* Book design elements */}
                <div className="absolute top-0 right-10 w-24 h-full bg-gradient-to-r from-transparent to-amber-900/5 select-none pointer-events-none"></div>
                <div className="absolute top-0 left-4 w-4 h-full bg-slate-900/5 select-none pointer-events-none border-r border-amber-900/5"></div>

                <div className="pl-6 space-y-6">
                  <div className="border-b border-amber-900/20 pb-4">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">한·일 학생 공동 역사 교과서 - 시안</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-black text-amber-950 mt-1">
                      {proposedTitle || '우리가 제안하는 독도 단원의 제목'}
                    </h2>
                    <div className="flex gap-2 text-xs text-amber-800 mt-2">
                      <p>✍️ 한측 대표: <strong>{studentKo || '미지정'}</strong></p>
                      <p>✍️ 일측 대표: <strong>{studentJa || '미지정'}</strong></p>
                    </div>
                  </div>

                  {/* Body Page content */}
                  <div className="min-h-[16rem]">
                    <p className="text-xs sm:text-sm font-serif text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {essayBody || (
                        <span className="text-slate-400 italic">
                          좌측 서술지에 본문을 기획해 넣으면, 이곳에 실시간으로 실제 고등학교 공동 역사 교과서의 가상 양식에 맞춰 인쇄 시뮬레이션이 출력됩니다.
                          <br /><br />
                          (작성 예시: 동해의 평화로운 섬 독도는 역사적 사료를 통해 그 지위가 증명된다. 한국의 『세종실록지리지(1454년)』에는 울릉도와 독도가 서로 거리가 멀지 않아 날씨가 맑으면 육안으로 관측 가능하다고 기록되어 양국의 고대 생활권과 인식을 보여준다...)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Review feedback panel */}
                  {hasSubmittedBook && evalGrade && (
                    <div className="bg-white/80 p-4 rounded-xl border border-amber-200 mt-4 animate-fadeIn">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-extrabold text-amber-800">모의 교과서 편찬위원회 채점 피드백</span>
                        <span className="bg-sky-500 text-white text-xs font-black px-2.5 py-1 rounded-full">{evalGrade.grade} 등급</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                        {evalGrade.feedback}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pl-6 pt-4 border-t border-amber-900/10 flex justify-between items-center text-[10px] text-amber-800/60 font-mono">
                  <span>EAST SEA PEACE UNION PRESS</span>
                  <span>PAGE 131</span>
                </div>
              </div>
            </div>

            {/* Self-Reflection & Discussion Forum Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">자기 성찰 및 생각 쓰기</span>
                <h3 className="text-xl font-bold text-slate-950 mt-0.5">교재 심층 토론 질문 리스트</h3>
                <p className="text-sm text-slate-500 mt-1">
                  아래 세 가지 주제에 대해 교재의 지식을 종합하여 본인의 비판적 생각과 해결책을 적어 저장해 보세요.
                </p>
              </div>

              <div className="space-y-6">
                {/* Question 1 */}
                <div className="space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                    <span className="bg-slate-200 text-slate-800 text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                    일본의 1877년 『태정관 지령』과 첨부된 『기죽도약도』가 현대 일본 정부의 "에도시대부터 독도를 자국 영토로 인지했다"는 핵심 논점 주장을 반박하는 가장 결정적인 반증 카드가 되는 이유는 무엇인가요?
                  </h4>
                  <textarea 
                    rows={2}
                    value={discussAnswers.q1}
                    onChange={(e) => setDiscussAnswers({...discussAnswers, q1: e.target.value})}
                    placeholder="당신의 성찰 답변을 적으세요"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-slate-50"
                  ></textarea>
                </div>

                {/* Question 2 */}
                <div className="space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                    <span className="bg-slate-200 text-slate-800 text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                    1998년 체결된 '신한일어업협정'에서 왜 독도가 한국의 독자적 배타적 경제수역(EEZ)의 완전한 기점이 되지 못하고 중간수역에 놓이게 되었는지, 당시 조약 타협 과정의 어업권 보호 측면에서 평가해 보세요.
                  </h4>
                  <textarea 
                    rows={2}
                    value={discussAnswers.q2}
                    onChange={(e) => setDiscussAnswers({...discussAnswers, q2: e.target.value})}
                    placeholder="당신의 성찰 답변을 적으세요"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-slate-50"
                  ></textarea>
                </div>

                {/* Question 3 */}
                <div className="space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                    <span className="bg-slate-200 text-slate-800 text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                    미래 세대인 우리가 영토 갈등을 감정적으로 키우지 않고 평화적으로 상생하여 해결하기 위해, 한일 역사 캠프나 학술 공동 프로젝트 등 구체적 교류가 필요한 이유에 대해 본인의 생각을 적어보세요.
                  </h4>
                  <textarea 
                    rows={2}
                    value={discussAnswers.q3}
                    onChange={(e) => setDiscussAnswers({...discussAnswers, q3: e.target.value})}
                    placeholder="당신의 성찰 답변을 적으세요"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-slate-50"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <button 
                    onClick={() => {
                      setSavedDiscussions(true);
                      setTimeout(() => setSavedDiscussions(false), 3000);
                    }}
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-sky-600 transition-all shadow"
                  >
                    학습 성찰 노트 저장하기
                  </button>
                  {savedDiscussions && (
                    <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      성찰 내용이 로컬 세션에 안전하게 보관되었습니다!
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================== CHAPTER 5: COMPREHENSION QUIZ ==================== */}
        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Intro Header */}
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-xl flex gap-3 items-start">
              <HelpCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-indigo-900 font-bold">도전! 독도 영토 주권 골든벨</h3>
                <p className="text-indigo-700 text-sm mt-1">
                  본 학습 교재를 열심히 연구했다면 쉽게 풀 수 있는 5가지 기출 엄선 핵심 퀴즈를 풀고 자신의 이해도를 측정해 보세요.
                </p>
              </div>
            </div>

            {/* Quiz Cards container */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="space-y-8">
                {QUIZ_QUESTIONS.map((item, qIdx) => (
                  <div key={qIdx} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest block">문제 0{qIdx + 1}</span>
                    <h4 className="font-extrabold text-slate-900 text-base mt-1">{item.question}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                      {item.options.map((opt, oIdx) => {
                        const isSelected = quizSelections[qIdx] === oIdx;
                        const isCorrect = item.correct === oIdx;
                        let optionStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                        if (showQuizResults) {
                          if (isCorrect) {
                            optionStyle = 'bg-emerald-500 text-white border-emerald-500';
                          } else if (isSelected) {
                            optionStyle = 'bg-rose-500 text-white border-rose-500';
                          } else {
                            optionStyle = 'bg-white opacity-50 border-slate-200 text-slate-400';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-indigo-600 text-white border-indigo-600';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={showQuizResults}
                            onClick={() => handleQuizSelect(qIdx, oIdx)}
                            className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${optionStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-900/10 flex items-center justify-center text-xs shrink-0">{oIdx + 1}</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Question Specific Explanation */}
                    {showQuizResults && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <strong className="text-indigo-600">💡 학습 보충 설명:</strong> {item.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quiz Submit & Reset control bar */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {!showQuizResults ? (
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      모든 문제를 선택한 후에 ‘제출 및 결과 보기’ 버튼을 클릭해 정답을 맞추어 보세요.
                    </p>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-slate-900">최종 스코어:</span>
                      <span className="bg-indigo-600 text-white text-base font-black px-4 py-1.5 rounded-full">
                        {quizScore} / {QUIZ_QUESTIONS.length} 점 ({Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)}%)
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 shrink-0">
                  {showQuizResults ? (
                    <button
                      onClick={resetQuiz}
                      className="bg-slate-100 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-200 transition-all"
                    >
                      다시 풀기
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowQuizResults(true)}
                      disabled={quizSelections.includes(null)}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                        quizSelections.includes(null)
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      제출 및 정답 결과 보기
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-slate-300 font-bold">독도 영토 주권 교육 종합 교재 인터랙티브 플랫폼</p>
          <p>© 2026 대한민국 역사·지리 평화교육위원회. 본 학습 도구는 공공 교육 보조 자료 및 학술 목적 보급용입니다.</p>
          <div className="flex justify-center gap-4 text-[10px] text-slate-500 pt-2">
            <span>위도: 북위 37°14′26.8"</span>
            <span>경도: 동경 131°52′10.4"</span>
            <span>도로명: 경상북도 울릉군 울릉읍 독도리 이사부길 / 안용복길</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

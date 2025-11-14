const qaData = [
  {
    keywords: ["서비스", "무엇", "뭐", "what", "service"],
    answer:
      "Perso.ai는 이스트소프트가 개발한 다국어 AI 영상 더빙 플랫폼으로, 누구나 언어의 장벽 없이 영상을 제작하고 공유할 수 있도록 돕는 AI SaaS 서비스입니다.",
  },
  {
    keywords: ["기능", "뭐할수", "feature", "what can"],
    answer:
      "Perso.ai는 AI 음성 합성, 립싱크, 영상 더빙 기능을 제공합니다. 사용자는 원본 영상에 다른 언어로 음성을 입히거나, 입 모양까지 자동으로 동기화할 수 있습니다.",
  },
  {
    keywords: ["기술", "사용", "technology", "tech"],
    answer:
      "Perso.ai는 ElevenLabs, Microsoft, Google Cloud Speech API 등과 같은 글로벌 기술 파트너의 음성합성 및 번역 기술을 활용하며, 자체 개발한 립싱크 엔진을 결합합니다.",
  },
  {
    keywords: ["사용자", "얼마", "user", "users"],
    answer: "2025년 기준, 전 세계 누적 20만 명 이상의 사용자가 Perso.ai를 통해 AI 기반 영상 제작을 경험했습니다.",
  },
  {
    keywords: ["고객", "타겟", "customer", "target"],
    answer:
      "유튜버, 강의 제작자, 기업 마케팅 담당자 등 영상 콘텐츠를 다국어로 확장하려는 개인 및 기업 고객이 주요 타깃입니다.",
  },
  {
    keywords: ["언어", "얼마나", "language", "languages"],
    answer: "현재 30개 이상의 언어를 지원하며, 한국어, 영어, 일본어, 스페인어, 포르투갈어 등 주요 언어가 포함됩니다.",
  },
  {
    keywords: ["요금", "가격", "플랜", "pricing", "plan", "fee"],
    answer:
      "Perso.ai는 사용량 기반 구독 모델을 운영합니다. Free, Creator, Pro, Enterprise 플랜이 있으며 Stripe를 통해 결제할 수 있습니다.",
  },
  {
    keywords: ["개발", "누가", "who", "developer"],
    answer: "Perso.ai는 소프트웨어 기업 이스트소프트(ESTsoft)가 개발했습니다.",
  },
  {
    keywords: ["이스트소프트", "eastsoft", "est"],
    answer:
      "이스트소프트는 1993년에 설립된 IT 기업으로, 알집, 알약, 알씨 등 생활형 소프트웨어로 잘 알려져 있으며, 최근에는 인공지능 기반 서비스 개발에 집중하고 있습니다.",
  },
  {
    keywords: ["강점", "장점", "strength", "advantage"],
    answer:
      "AI 음성 합성과 립싱크 정확도가 높고, 다국어 영상 제작이 간편하며, 실제 사용자 인터페이스가 직관적이라는 점이 강점입니다.",
  },
  {
    keywords: ["회원가입", "가입", "sign up", "register"],
    answer: "네, 이메일 또는 구글 계정으로 간단히 회원가입 후 서비스를 이용할 수 있습니다.",
  },
  {
    keywords: ["편집", "지식", "필요", "knowledge", "editing"],
    answer:
      "아니요. Perso.ai는 누구나 쉽게 사용할 수 있도록 설계되어 있어, 영상 편집 경험이 없어도 바로 더빙을 시작할 수 있습니다.",
  },
  {
    keywords: ["고객센터", "문의", "연락", "contact", "support"],
    answer: "Perso.ai 웹사이트 하단의 문의하기 버튼을 통해 이메일 또는 채팅으로 고객센터에 문의할 수 있습니다.",
  },
]

function findAnswer(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  for (const qa of qaData) {
    if (qa.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return qa.answer
    }
  }

  return "Perso.ai에 대해 더 알고 싶으신 것이 있으시면 구체적으로 질문해주세요. AI 영상 더빙, 기능, 가격, 기술 등 다양한 주제에 대해 답변해드릴 수 있습니다."
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return Response.json({ error: "메시지가 필요합니다" }, { status: 400 })
    }

    const reply = findAnswer(message)

    return Response.json({ reply })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "챗봇 처리 중 오류가 발생했습니다" }, { status: 500 })
  }
}

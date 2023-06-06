export const defaultExperience = {
	date: undefined,
	place: undefined,
	people: undefined,
	playmate: undefined,
	emoji: undefined,
	aperitif: undefined,
}

export const experienceSteps = {
	date: {
		question: "experienceStepQuestionDate",
		answer: undefined,
		next: "place",
	},
	place: {
		question: "experienceStepQuestionPlace",
		answer: undefined,
		next: "people",
		prev: "date",
	},
	people: {
		question: "experienceStepQuestionPeople",
		answer: undefined,
		next: "emoji",
		prev: "place",
	},
	playmate: {
		question: "experienceStepQuestionPlaymate",
		answer: undefined,
		next: "emoji",
		prev: "people",
	},
	emoji: {
		question: "experienceStepQuestionEmoji",
		explanation: "experienceStepExplanationEmoji",
		answer: undefined,
		next: "aperitif",
		prev: "playmate",
	},
	aperitif: {
		question: "experienceStepQuestionAperitif",
		explanation: "experienceStepExplanationAperitif",
		answer: undefined,
		next: "end",
		prev: "emoji",
	},
	end: {
		question: "experienceStepQuestionEnd",
		prev: "aperitif",
	}
}

export const placeOptions = [
	{ label: "Tv" , emoji: "📺", value: "tv", type: "tv"},
	{ label: "Cinema" , emoji: "🎥", value: "cinema"},
	{ label: "Streaming" , emoji: "💻", value: "streaming", type: "tv"},
]


export const playmateEmojiOptions = [
	{
		value: '💘',
		label: '💘',
	},
	{
		value: '🐶',
		label: '🐶',
	},
	{
		value: '👴',
		label: '👴',
	},
	{
		value: '👩',
		label: '👩',
	},
	{
		value: '🧑',
		label: '🧑',
	},
	{
		value: '👨‍🦲',
		label: '👨‍🦲',
	},
	{
		value: '🧔',
		label: '🧔',
	},
	{
		value: '🤠',
		label: '🤠',
	},
	{
		value: '🐱',
		label: '🐱',
	},
	{
		value: '🐒',
		label: '🐒',
	},
	{
		value: '🤡',
		label: '🤡',
	},
	{
		value: '💙',
		label: '💙',
	},
	{
		value: '🩷',
		label: '🩷',
	},
	{
		value: '👩‍🦰',
		label: '👩‍🦰',
	},
	{
		value: '🧑‍🦰',
		label: '🧑‍🦰',
	},
	{
		value: '👨‍🦰',
		label: '👨‍🦰',
	},
	{
		value: '🧑‍🦳',
		label: '🧑‍🦳',
	},
	{
		value: '🧔‍♀️',
		label: '🧔‍♀️',
	},
	{
		value: '👶',
		label: '👶',
	},
	{
		value: '🧒',
		label: '🧒',
	},
	{
		value: '👦',
		label: '👦',
	},
]
export const emojiOptions = [
	{ emoji: "👍", value: "y1"},
	{ emoji: "😍", value: "y2"},
	{ emoji: "👎", value: "n1"},
	{ emoji: "🤢", value: "n2"},
	{ emoji: "🔝", value: "y3"},
	{ emoji: "🥺", value: "y4"},
	{ emoji: "🥹", value: "y5"},
	{ emoji: "😡", value: "n3"},
	{ emoji: "🫣", value: "n4"},
	{ emoji: "🫤", value: "n5"},
	{ emoji: "🤬", value: "n6"},
	{ emoji: "🤯", value: "n7"},
	{ emoji: "😱", value: "n8"},
	{ emoji: "🫠", value: "y6"},
	{ emoji: "🫶", value: "y7"},
	{ emoji: "🤌", value: "n9"},
	{ emoji: "🔥", value: "y8"},
	{ emoji: "💩", value: "n10"},
	{ emoji: "🤡", value: "n11"},
	{ emoji: "🤪", value: "y9"},
	{ emoji: "👊", value: "y10"},
]

export const aperitifOptions = [
	{ emoji: "🍿", value: "1"},
	{ emoji: "🍟", value: "2"},
	{ emoji: "🍘", value: "3"},
	{ emoji: "🫒", value: "4"},
	{ emoji: "🍕", value: "5"},
	{ emoji: "🌭", value: "6"},
	{ emoji: "🍔", value: "7"},
	{ emoji: "🍝", value: "8"},
	{ emoji: "🍪", value: "9"},
	{ emoji: "🍑", value: "10"},
	{ emoji: "🍦", value: "11"},
	{ emoji: "🍣", value: "12"},
	{ emoji: "🥂", value: "13"},
	{ emoji: "🍷", value: "14"},
	{ emoji: "🍸", value: "15"},
	{ emoji: "🍺", value: "16"},
	{ emoji: "🧃", value: "17"},
	{ emoji: "🥤", value: "18"},
	{ emoji: "🫖", value: "19"},
	{ emoji: "🍹", value: "20"},
	{ emoji: "☕", value: "21"},
];
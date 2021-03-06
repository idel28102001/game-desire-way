const cardsAction = {
    macCard: `Ведущий предлагает игроку достать карту из колоды "Путь желаний".`,
    extraAns: [
        "Что изображено на карте?",
        "Что по вашему мнению, сейчас происходит на карте?",
        "Что на карте привлекло ваше внимание больше всего?Как вы думаете почему?",
        "Чем притягательна эта карта для вас?",
        "Есть ли на этой карте вы? Или кто может быть из вашей реальной жизни?",
        "Как то, что изображено на карте, говорит о вас и вашей мечте?",
    ],
    obstacle: `Такой ход говорит о том, что участник столкнулся с форс-мажорными событями. Ему предстоит найти внутри себя ресурс их преодолеть. Можно выйти из хода или с ресурсом, или без. Участник кидает кубик для решения его судьбы.`,
    obstacleNums: [
        `2,4 - игрок ничего не потерял, ничего не приобрёл. Участник должен выписать 3 страха от желания, затем перечекнуть их и написать: "Это всего лишь мои страхи".`,
        `6 - игрок получает ресурс.`,
        `1,3,5 - игрок теряет ресурс.`,
    ],
    magicLeaf: `Попадая на этот ход, участник образно получает "Волшебное перо" и достаёт карту из колоды "Волшебное перо". Ведущий поздравляет участника, и предлагает отметить получение пера в маршрутном листе. Собрав все 5 перьёв, считается, что человек исполнил свою мечту.`,
    goodThing: [
        `Я хочу получать удовольствие от путешествия с друзьями  к морю. Я уверена, что это путешествие принесёт огромную пользу всем детям моих друзей, которые будут купаться и общаться с родителями.`,
        `Отелям, где мы будем бронировать жильё.`,
        `Авиакомпании, у которой мы купим билеты.`,
        `Местным кафе, где мы будем уютно проводить свои ужины.`,
    ],
    extendTask: [
        `Улыбаться на протяжении 15 секунд всем участникам игры.`,
        `Громко, эмоционально и с выражением произнести вслух своё желание.`,
        `Перечислить имена присутсвуюзих и добавить приятное прилагательное к каждому.`,
        `Крикнуть в окно: "Мир! Я разрешаю тебе дать мне всё, что я хочу."`,
        `Поставить/сменить фото на аватарке в любой социальной сети.`,
        `Рассказать момент, когда появилась эта мечта.`,
        `Быстро назвать слова на букву каждого слова вашего желания.`,
        `Присесть/прыгнуть 20 раз и произнести своё желание.`,
        `Сказать себе 10 комплиментов.`,
        `Пройтись по комнате в разных ботинках или босиком.`,
        `Позвонить близкому человек и сказать: "Я тебя люблю".`,
        `Переодеть наизнану какой-то один элемент одежды.`,
    ],
    india: `«Все мы знаем о такой интересной
    стране, как Индия. Индийцы облада-
    ют огромными природными ресурса-
    ми. Они могли бы покончить с голо-
    ‘дом уже давно и изменить ту ситуа-
    цию, в которой живут. Но они верят,
    что при рождении становятся частью
    кастовой системы и если что-то пред-
    примут, чтобы выбраться из нее, и
    как-то решат поспособствовать
    своему благополучию, то могут пере-
    родиться в муравья или кого похуже.
    Более того, многим известна страш-
    ная экологическая ситуация священ-
    ных рек Индии, но религиозные
    убеждения - еще более сильная
    вещь. Несмотря на статистику смер-
    тей отупотребления грязной воды,
    ничего не меняется в душах коренно-
    го народа. Подобные убеждения дают
    надежду на одно, но очень сильно
    ограничивают в другом. На таком
    ярком примере очень хорошо видна
    разница между ограничением и убе-
    ждением. Как вы думаете, есть ли в
    вашей жизни то, что не дает вам дви-
    гаться к вашей мечте, хоть вы этого и
    хотите?»`,
    colors: [
        [
            `Красный `,
            `Добавьте красный в своё окружение в тот момент, когда Вы чуствуете энергетического истощение и то, что Ваше желание слишком далеко от Вас. Красный цвет обеспечивает питание от Земли, связывает духовное тело с физическим. Красный отвечает за ошущение безопасности, стабильности, сескуальности, призимлённости, мужества, импульсивонсти и индивидуальности.`,
        ],
        [
            `Оранжевый `,
            `Очень мощный и чувственный цвет. Используйте его экономно, но в достаточной мере, чтобы ощущать уверенность в себе и свободу. Отвечает за чувства, эмоции, интимность,
    творчество, полярность, чувствительность, уверенность, общительность,
    свободу, движение.`,
        ],
        [
            `Желтый `,
            `Желтый проясняет все происходящее в окружающем мире. Используйте его дозированно, в небольших количествах, слишком много желтого может возбудить гнев. Отвечает за силу воли, знания, радость, остроумие, просветление разума, юмор,
    оптимизм, любопытство, самоконтроль, осознание, самоуважение.`,
        ],
        [
            `Зелёный `,
            `Зеленый — это цвет, символизирующий обновление и исцеление. Это.
    центр цветовой гаммы, место между
    небом и Землей. Отвечает за любовь,
    самоконтроль, сострадание, прощение, мир, гармонию, обновление,
    духовный рост.`,
        ],
        [
            `Голубой `,
            `Глубокие мысли на интуитивном
    уровне, чистые, как кристалл. Отвечаетза интуицию, изобретательность,
    умственные способности, самореализацию, восприятие, понимание,
    память, смелость, избавление.`,
        ],
        [
            `Синий `,
            `Используйте этот цвет, когда наступает эмоциональное расстройство, или
    когда Вам нужна дополнительная
    осмотрительность и мудрость. Открывает рациональное мышление. Отвечает за коммуникацию, мудрость,
    доверие, речь, творческое проявление, пространственное планирова-
    ние, организованность и осторожность.`,
        ],
        [
            `Фиолетовый `,
            `Фиолетовый открывает дверь в
    познание. Используйте фиолетовый,
    чтобы сбалансировать и открыть
    высокие уровни сознания. Отвечает
    за знания, мудрость, вдохновение,
    харизму, эго, медитацию, божественную связь.`,
        ],
    ],
};

export const localSto = {
    'Сектор 1. "Отношения"': [{
            color: '.color-1',
            title: "Метафорическая карта в игре",
            src: "../assets/img/icons/1/1.png",
            text: {
                action: { title: "Действие:", text: cardsAction["macCard"] },
                answers: {
                    title: "Вопросы:",
                    array: [
                        "Как моё окружение может поддержать меня на пути к желанию?",
                        "Как его исполнение повлияет на важные отношения с собой и миром?",
                        "Как его исполнение повлияет на отношения с  собой и миром?",
                    ],
                },
                extra: {
                    btnTitle: "Дополнительные вопросы",
                    title: "Вопросы:",
                    array: cardsAction["extraAns"],
                },
            },
        },
        {
            color: '.color-1',
            title: "Метафорическое колесо баланса",
            src: "../assets/img/icons/1/2.png",
            text: {
                action: {
                    title: "Озвучьте:",
                    text: `"Давай сосредоточимся на возможностях игры и попросим кубик 6D вычислить сектор на колесе баланса, на отношения с которым тебе стоит обратить внимание или сектор, где ты можешь черпать ресурс? Какой вариант тебе больше отзывается?"`,
                },
                mustDo: {
                    title: "Участник:",
                    text: "Должен пояснить сектор, выпавший на колесе в рамках своей реальной жизни.",
                },
                answers: {
                    title: "Значения кубика:",
                    array: [
                        "Сердце(любовь)",
                        "Мешок(деньги)",
                        "Краски(хобби)",
                        "Люди(Дружба)",
                        "Врач(здоровье)",
                        "Портфель(карьера)",
                    ],
                    cls: ['.head-item-curr', '.content-item-curr', '.content-all-curr-number', '.item-item-curr-number'],
                },
            },
        },
        {
            color: '.color-1',
            title: "Препятствие",
            src: "../assets/img/icons/1/3.png",
            text: {
                action: {
                    title: "Форс-мажор:",
                    text: cardsAction["obstacle"],
                },
                condition: { title: "Действие:", text: "Участник кидает кубик 6D." },
                answers: {
                    title: "Ведущий может:",
                    array: [
                        "Попросить участника сформировать вопрос, что касается его желания или текущей рассматриваемой сферы.",
                        `Спросить: "В связи с кем/чем могут быть сложности по достижению мечты?".`,
                    ],
                },
                extra: {
                    btnTitle: "Значения кубика",
                    title: "Значение кубика",
                    array: cardsAction["obstacleNums"],
                },
            },
        },
        {
            color: '.color-1',
            title: "Эмоции желания",
            src: "../assets/img/icons/1/4.png",
            text: {
                action: {
                    title: "Первый шаг(ищем карту):",
                    text: `Участник должен вытягивать карту из колоды "Эмоции" до тех пор, пока нет эмоций от карты, что могут мешать участнику(он должен искать ту карту, что вызывает эмоцию, что ему помогает).`,
                },
                answers: {
                    title: "Второй шаг(отвечаем на вопросы)",
                    array: [
                        "Отношения с кем мне помогут испытывать эту эмоцию чаще?",
                        `Как я могу испытывать её в отношениях с собой?`,
                    ],
                },
                info: {
                    title: `Дополнительно:`,
                    text: `Если участник увидел эмоциональный ресурс с первой карточки - он получает доп. ресурс. Иначе - нет.`,
                },
            },
        },
        {
            color: '.color-1',
            title: "Продолжи фразу",
            src: "../assets/img/icons/1/5.png",
            text: {
                cond: {
                    title: "Действие",
                    text: `Участник кидает кубик 12D и называет номер выпавшего числа. Ведущий озвучиваете начало фразы с определённым номером, а участник должен продолжить за ним. Далее идёт обсуждение разницы и сходства фразы.`,
                },
                extra: {
                    cls: ['.head-item-curr', '.content-item-curr-number', '.content-all-curr'],
                    classList: ["phraseI", "phraseF", "phraseS"],
                    btnTitle: "Значения кубиков",
                    title: `Значения кубика`,
                    array: [
                        [
                            "Если ты собираешься в один прекрасный день создать что-то великое, помни: ",
                            "один прекрасный день - это сегодня. (Стивен Спилберг).",
                        ],
                        [
                            `Единственный способ делать великие дела - `,
                            `любить то, что Вы делаете. (Стив Джобс).`,
                        ],
                        [
                            `Между успехом и неудачей лежит пропасть, имя которой `,
                            `у меня нет времени". (Франклин Филд).`,
                        ],
                        [
                            `Логика может привести Вас от пункта А к пункту Б, а воображение - `,
                            `куда угодно...(Альберт Энштейн).`,
                        ],
                        [
                            `Ничего не делать очень сложно, потому что `,
                            `никогда не знаешь, когда закончишь. (Лесли Нильсон).`,
                        ],
                        [
                            `Зачастую говорят, что мотивации хватает ненадолго. `,
                            `Ну так, то же самое происходит и с освежающим душем, поэтому и рекоммендуют его принимать ежедневно. (Зиг Зиглар).`,
                        ],
                        [
                            `Вся твоя жизнь на 90% зависит от тебя самого и лишь на 10% - `,
                            `от обстоятельств, которые на 99% зависят от тебя.`,
                        ],
                        [
                            `Никогда не отказывайся от того, `,
                            `что заставляет тебя улыбаться. (Леджер Хит).`,
                        ],
                        [
                            `Когда вы чего-то вы очень сильно хотите - `,
                            `в игру вступает "Закон притяжения. (Эндрю Карнеги)"`,
                        ],
                        [
                            `Есть только одна причина, которая делает мечту недостижимой, -`,
                            `страх провала. (Пауло Коэльо).`,
                        ],
                        [
                            `Если вы думаете, что вы способны на что-то, вы правы, если вы думаете, что у вас не получиться что-то `,
                            `вы тоже правы. (Генри Форд).`,
                        ],
                        [
                            `Кораблю безопасней в порту, но `,
                            `он не для этого строился. (Грейс Хоппер).`,
                        ],
                    ],
                },
            },
        },
        {
            title: "Волшебное перо",
            src: "../assets/img/icons/1/6.png",
            text: {
                answers: { title: "Описание:", text: cardsAction["magicLeaf"] },
            },
        },
    ],
    'Сектор 2. "Духовное развитие"': [{
            color: '.color-2',
            title: "Метафорическая карта в игре",
            src: "../assets/img/icons/2/1.png",
            text: {
                action: { title: "Действие", text: cardsAction["macCard"] },
                answers: {
                    title: "Вопросы:",
                    array: [
                        `Что я подарю этому миру, когда моё желание исполнится?`,
                        `Как исполнение желания влияет на моё духовное развитие, на связь с миром?`,
                    ],
                },
                extra: {
                    btnTitle: "Дополнительные вопросы",
                    title: "Вопросы:",
                    array: cardsAction["extraAns"],
                },
            },
        },
        {
            color: '.color-2',
            title: "Шлейф пользы",
            src: "../assets/img/icons/2/2.png",
            text: {
                answers: {
                    title: `Вопрос:`,
                    text: `"Кому ещё от вашего желания будет хорошо?"`,
                },
                cond: { title: `Примеры ответа:`, array: cardsAction["goodThing"] },
                conds: {
                    title: `Итог:`,
                    text: `После аргументированного ответа участник получает ресурс сектора.`,
                },
            },
        },
        {
            color: '.color-2',
            title: "Препятствие",
            src: "../assets/img/icons/2/3.png",
            text: {
                action: {
                    title: "Форс-мажор:",
                    text: cardsAction["obstacle"],
                },
                condition: { title: "Действие:", text: "Участник кидает кубик 6D." },
                answers: {
                    title: "Ведущий может:",
                    array: [
                        "Попросить участника сформировать вопрос, что касается его желания или текущей рассматриваемой сферы.",
                        `Спросить: "В связи с кем/чем могут быть сложности по достижению мечты?".`,
                    ],
                },
                extra: {
                    btnTitle: "Значения кубика",
                    title: "Значение кубика",
                    array: cardsAction["obstacleNums"],
                },
            },
        },
        {
            color: '.color-2',
            title: "Благодарность",
            src: "../assets/img/icons/2/4.png",
            text: {
                answers: {
                    title: "Вопрос:",
                    text: `За что Вы можете поблагодарить на пути к своей мечте?`,
                },
                conds: {
                    title: `Итог:`,
                    text: `Участник делится своими мыслями и при желании выписывает поводы для благодарности`,
                },
            },
        },
        {
            color: '.color-2',
            title: "Ответ вселенной",
            src: "../assets/img/icons/2/5.png",
            text: {
                answers: {
                    title: `Описание:`,
                    text: `Что Вселенная думает об исполнении вашего желания? Для получения ответа кидайте кубик 6D.`,
                },
                conds: {
                    cls: ['.head-item-curr', '.content-item-curr', '.content-all-curr', '.item-item-curr-number'],
                    title: `Значение кубика:`,
                    array: [
                        "Да, держи.",
                        `Да, но чуть позже.`,
                        `У меня есть кое-что получше для тебя.`,
                        `Я тебя слышу.`,
                        `Я тебя понимаю.`,
                        `Не торопи события.`,
                    ],
                },
            },
        },
        {
            color: '.color-2',
            title: "Волшебное перо",
            src: "../assets/img/icons/2/6.png",
            text: {
                answers: { title: "Описание:", text: cardsAction["magicLeaf"] },
            },
        },
    ],
    'Сектор 3. "Финансы"': [{
            color: '.color-3',
            title: "Метафорическая карта в игре",
            src: "../assets/img/icons/3/1.png",
            text: {
                action: { title: "Действие", text: cardsAction["macCard"] },
                answers: {
                    title: "Вопросы:",
                    array: [
                        `Как изображение на этой карте поможет мне расширить моё финансовое мышление?`,
                        `Что поможет привлечь изобилие в жизнь?`,
                        `Как это связано с моим желанием?`,
                    ],
                },
                extra: {
                    btnTitle: "Дополнительные вопросы",
                    title: "Вопросы:",
                    array: cardsAction["extraAns"],
                },
            },
        },
        {
            color: '.color-3',
            title: "Действие/Бездействие",
            src: "../assets/img/icons/3/2.png",
            text: {
                action: { title: "Действие:", text: "Участник кидает кубик" },
                answers: {
                    title: "Значение кубика",
                    array: [
                        "Чётное - участник должен совершить 3 простых действия, что приблизят мечту участника. (Можно зайти на сайт и посмотреть сколько стоит мечта или высчитать цену мечты).",
                        "Нечётное - участник бездействует и пропускает ход.",
                    ],
                },
                dasd: {
                    title: "Итог",
                    text: "Участик даёт обратную связь о том, что чуствовал, когда пришла(не пришла) возможность к действию.",
                },
            },
        },
        {
            color: '.color-3',
            title: "Препятствие",
            src: "../assets/img/icons/3/3.png",
            text: {
                action: {
                    title: "Форс-мажор:",
                    text: cardsAction["obstacle"],
                },
                condition: { title: "Действие:", text: "Участник кидает кубик 6D." },
                answers: {
                    title: "Ведущий может:",
                    array: [
                        "Попросить участника сформировать вопрос, что касается его желания или текущей рассматриваемой сферы.",
                        `Спросить: "В связи с кем/чем могут быть сложности по достижению мечты?".`,
                    ],
                },
                extra: {
                    btnTitle: "Значения кубика",
                    title: "Значение кубика",
                    array: cardsAction["obstacleNums"],
                },
            },
        },
        {
            color: '.color-3',
            title: "В 2 раза",
            src: "../assets/img/icons/3/4.png",
            text: {
                answers: {
                    title: "Озвучьте:",
                    text: `"Разрешите Вселенной увеличить ваше желание в 2 раза. Что произойдёт с вашим желанием?"`,
                },
                conds: {
                    title: "Участник:",
                    text: "Должен ответить аргументированно.",
                },
                cond: { title: "Итог:", text: "Участник получает ресурс." },
            },
        },
        {
            color: '.color-3',
            title: "Мой новый стул",
            src: "../assets/img/icons/3/5.png",
            text: {
                answers: {
                    title: "Действие",
                    text: 'Участник должен представить человека, что является для него примером, а после сесть на "его стул" и представить себя тем же человеком по состоянию.',
                },
            },
        },
        {
            color: '.color-3',
            title: "Волшебное перо",
            src: "../assets/img/icons/3/6.png",
            text: {
                answers: { title: "Описание:", text: cardsAction["magicLeaf"] },
            },
        },
    ],
    'Сектор 4. "Самореализация"': [{
            color: '.color-4',
            title: "Метафорическая карта в игре",
            src: "../assets/img/icons/4/1.png",
            text: {
                action: { title: "Действие", text: cardsAction["macCard"] },
                answers: {
                    title: "Вопросы:",
                    array: [
                        "Какие изменения произойдут в моей жизни, когда мечта исполнится?",
                        "Как эта карта отражает моё место в мире?",
                    ],
                },
                extra: {
                    btnTitle: "Дополнительные вопросы",
                    title: "Вопросы:",
                    array: cardsAction["extraAns"],
                },
            },
        },
        {
            color: '.color-4',
            title: "Расширяющее задание",
            src: "../assets/img/icons/4/2.png",
            text: {
                answers: { title: `Действие:`, text: `Участник кидает кубик 12D.` },
                cond: {
                    title: `События:`,
                    text: `Участник должен выполнить задание согласно значению кубика. Если отказывается - теряет ресурс. В противном случае - получает его.`,
                },
                extra: {
                    btnTitle: `Значения кубика`,
                    title: "Значения кубика",
                    array: cardsAction["extendTask"],
                    cls: ['.head-item-curr', '.content-item-curr-number', '.content-all-curr'],
                },
            },
        },
        {
            color: '.color-4',
            title: "Препятствие",
            src: "../assets/img/icons/4/3.png",
            text: {
                action: {
                    title: "Форс-мажор:",
                    text: cardsAction["obstacle"],
                },
                condition: { title: "Действие:", text: "Участник кидает кубик 6D." },
                answers: {
                    title: "Ведущий может:",
                    array: [
                        "Попросить участника сформировать вопрос, что касается его желания или текущей рассматриваемой сферы.",
                        `Спросить: "В связи с кем/чем могут быть сложности по достижению мечты?".`,
                    ],
                },
                extra: {
                    btnTitle: "Значения кубика",
                    title: "Значение кубика",
                    array: cardsAction["obstacleNums"],
                },
            },
        },
        {
            color: '.color-4',
            title: "Убеждение",
            src: "../assets/img/icons/4/4.png",
            text: {
                answers: {
                    title: "Действие:",
                    text: "Участник должен выписать убеждение, связанное с его мечтой и переписать это убеждение в позитивном ключе",
                },
                extra: {
                    btnTitle: "История Индии",
                    title: "История Индии",
                    text: cardsAction["india"],
                },
            },
        },
        {
            color: '.color-4',
            title: "Хороший знак",
            src: "../assets/img/icons/4/5.png",
            text: {
                answers: {
                    title: `Действие:`,
                    text: `Участник должен сделать 3 скриншота картинок, которые будут описывать день, когда его мечта сбудется.`,
                },
                ddas: {
                    title: `Дополнительно:`,
                    text: `Можно предложить участнику обращать внимание на все хорошие знаки, что подтверждает, что участник на пути к мечте.`,
                },
            },
        },
        {
            color: '.color-4',
            title: "Волшебное перо",
            src: "../assets/img/icons/4/6.png",
            text: {
                answers: { title: "Описание:", text: cardsAction["magicLeaf"] },
            },
        },
    ],
    'Сектор 5. "Тело"': [{
            color: '.color-5',
            title: "Метафорическая карта в игре",
            src: "../assets/img/icons/5/1.png",
            text: {
                action: { title: "Действие", text: cardsAction["macCard"] },
                answers: {
                    title: "Вопросы:",
                    array: [
                        "Как на эту карту реагирует ваге тело?",
                        "Есть ли готовонсть двигаться в сторону исполнения желания? Да/Нет? И почему?",
                        "Каких ощущений вам хочется добавить, чтобы почуствовать, что желание на 100% ваше и у вас есть огромная внутренняя мотивация к нему идти?",
                    ],
                },
                extra: {
                    btnTitle: "Дополнительные вопросы",
                    title: "Вопросы:",
                    array: cardsAction["extraAns"],
                },
            },
        },
        {
            color: '.color-5',
            title: "Цветовая диагностика",
            src: "../assets/img/icons/5/2.png",
            text: {
                answers: {
                    title: `Действие:`,
                    text: `Участник должен выбрать карту из колоды "Цвета".`,
                },
                cscs: {
                    title: "Дополнительные вопросы:",
                    array: [
                        `Как на этот цвет реагирует ваше тело?`,
                        `Где и какие ощущения рождаются в теле?`,
                        `Как этот цвет влияет на ваше состояние и готовность идти навстречу к своей мечте`,
                    ],
                },
                extra: {
                    classList: ["colorI", "colorF", "colorS"],
                    btnTitle: "Цвета",
                    title: "Цвета",
                    array: cardsAction["colors"],
                },
            },
        },
        {
            color: '.color-5',
            title: "Препятствие",
            src: "../assets/img/icons/5/3.png",
            text: {
                action: {
                    title: "Форс-мажор:",
                    text: cardsAction["obstacle"],
                },
                condition: { title: "Действие:", text: "Участник кидает кубик 6D." },
                answers: {
                    title: "Ведущий может:",
                    array: [
                        "Попросить участника сформировать вопрос, что касается его желания или текущей рассматриваемой сферы.",
                        `Спросить: "В связи с кем/чем могут быть сложности по достижению мечты?".`,
                    ],
                },
                extra: {
                    btnTitle: "Значения кубика",
                    title: "Значение кубика",
                    array: cardsAction["obstacleNums"],
                },
            },
        },
        {
            color: '.color-5',
            title: "Мой месяц",
            src: "../assets/img/icons/5/4.png",
            text: {
                answers: {
                    title: `Действие:`,
                    text: `Участник кидает кубик 12D. Номер определяет месяц.`,
                },
                actions: {
                    title: `Вопросы ведущего:`,
                    array: [
                        `Как этот месяц связан с вашим желанием?`,
                        `Этот месяц идёт до исполнения, после или это именно он?`,
                        `Как вы себя чувствуете в этом месяце?`,
                    ],
                },
            },
        },
        {
            color: '.color-5',
            title: "Избавление от лишнего",
            src: "../assets/img/icons/5/5.png",
            text: {
                answers: {
                    title: "Действие:",
                    text: `Участник должен избавиться от 3-ёх вещей.`,
                },
                ddsaasd: {
                    title: "Примеры:",
                    array: [`Из сумочки.`, `На рабочем столе.`, `Из телефна.`],
                },
                dasd: { title: `Итог:`, text: `Участник получает ресурс.` },
            },
        },
        {
            color: '.color-5',
            title: "Волшебное перо",
            src: "../assets/img/icons/5/6.png",
            text: {
                answers: { title: "Описание:", text: cardsAction["magicLeaf"] },
            },
        },
    ],
};

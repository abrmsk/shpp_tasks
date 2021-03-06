# Getting Started with Create React App + Redux

## 01 Начало работы с React Redux (Getting Started with React ReduxPassed)
 
Эта серия задач знакомит с тем, как использовать Redux с React. Во-первых, вот обзор некоторых ключевых принципов каждой технологии. React - это библиотека представлений, которую вы предоставляете с данными, а затем она отображает представление эффективным и предсказуемым способом. Redux - это структура управления состоянием, которую вы можете использовать для упрощения управления состоянием вашего приложения. Обычно в приложении React Redux вы создаете единое хранилище Redux, которое управляет состоянием всего вашего приложения. Ваши компоненты React подписываются только на те фрагменты данных в магазине, которые имеют отношение к их роли. Затем вы отправляете действия непосредственно из компонентов React, которые затем запускают обновления хранилища.

Хотя компоненты React могут управлять своим собственным состоянием локально, когда у вас сложное приложение, обычно лучше сохранять состояние приложения в одном месте с помощью Redux. Есть исключения, когда отдельные компоненты могут иметь локальное состояние, специфичное только для них. Наконец, поскольку Redux не предназначен для работы с React из коробки, вам необходимо использовать этот react-reduxпакет. Он позволяет передавать Redux stateи dispatchкомпоненты React в виде файлов props.

Для решения следующих нескольких задач сначала вы создадите простой компонент React, который позволяет вводить новые текстовые сообщения. Они добавляются в массив, отображаемый в представлении. Это должен быть хороший обзор того, что вы узнали на уроках React. Затем вы создадите хранилище Redux и действия, которые управляют состоянием массива сообщений. Наконец, вы будете использовать его react-reduxдля подключения хранилища Redux к вашему компоненту, извлекая тем самым локальное состояние в хранилище Redux.

Начнем с DisplayMessagesкомпонента. Добавьте конструктор к этому компоненту и инициализируйте его состоянием, имеющим два свойства:, inputдля которого установлена ​​пустая строка, и messages, для которого установлен пустой массив.

## 02 Управление состоянием в первую очередь локально (Manage State Locally FirstPassed)

На этом вы закончите создание DisplayMessages компонента.

Во-первых, в render() методе необходимо, чтобы компонент визуализировал input элемент, buttonэлемент и ulэлемент. Когда inputэлемент изменяется, он должен запускать handleChange()метод. Кроме того, inputэлемент должен отображать значение input, находящееся в состоянии компонента. button Элемент должен вызвать submitMessage() метод, когда он нажал.

Во-вторых, напишите эти два метода. handleChange()Метод должен обновить inputс тем, что печатает пользователь. submitMessage()Метод должен конкатенация текущего сообщения (хранится в input) в messagesмассив в локальном состоянии, и очистить значение из input.

Наконец, используйте ulдля сопоставления массива messagesи отображения его на экране в виде списка liэлементов.

## 03 Извлечь логику состояния в Redux (Extract State Logic to Redux)

Теперь, когда вы закончили работу с компонентом React, вам нужно переместить логику, которую он выполняет локально, в state Redux. Это первый шаг к подключению простого приложения React к Redux. Единственная функция, которую имеет ваше приложение, - это добавление новых сообщений от пользователя в неупорядоченный список. Пример прост, чтобы продемонстрировать, как React и Redux работают вместе.

Сначала определите тип действия ADD и установите для него константу ADD. Затем определите создателя действия, addMessage() который создает действие для добавления сообщения. Вам нужно будет передать message этому создателю действия и включить сообщение в возвращаемое action.

Затем создайте редуктор с именем, messageReducer() который обрабатывает состояние сообщений. Начальное состояние должно равняться пустому массиву. Этот редуктор должен добавить сообщение в массив сообщений, содержащихся в состоянии, или вернуть текущее состояние. Наконец, создайте хранилище Redux и передайте ему редуктор.

## 04 Используйте провайдера для подключения Redux к React (Use Provider to Connect Redux to React)

В последней задаче вы создали хранилище Redux для обработки массива сообщений и создали действие для добавления новых сообщений. Следующим шагом является предоставление React доступа к хранилищу Redux и действий, необходимых для отправки обновлений. React Redux предоставляет свой react-redux пакет для выполнения этих задач.

React Redux предоставляет небольшой API с двумя ключевыми функциями: Provider и connect. Другой вызов охватывает connect. Это Provider компонент-оболочка от React Redux, который обертывает ваше приложение React. Затем эта оболочка позволяет вам получить доступ к Redux storeи dispatch функциям во всем дереве компонентов. Provider занимает два свойства: хранилище Redux и дочерние компоненты вашего приложения. Определение Provider для компонента приложения может выглядеть следующим образом:

<Provider store={store}>
  <App/>
</Provider>

Редактор кода теперь показывает весь ваш код Redux и React из нескольких прошлых задач. Он включает в себя хранилище Redux, действия и DisplayMessagesкомпонент. Единственная новая деталь - это AppWrapperкомпонент внизу. Используйте этот компонент верхнего уровня для рендеринга Providerfrom ReactReduxи передайте хранилище Redux в качестве опоры. Затем визуализируйте DisplayMessagesкомпонент как дочерний. Когда вы закончите, вы должны увидеть, что ваш компонент React отображается на странице.

Примечание. React Redux доступен здесь как глобальная переменная, поэтому вы можете получить доступ к поставщику с помощью точечной нотации. Код в редакторе использует это преимущество и устанавливает для него константу, которую Providerвы можете использовать в AppWrapperметоде рендеринга.

## 05 Сопоставить состояние с реквизитом (Map State to Props)

Provider Компонент позволяет обеспечить state и dispatch вашим React компонентов, но вы должны точно определить, в каком состоянии и действия, которые вы хотите. Таким образом, вы убедитесь, что каждый компонент имеет доступ только к тому состоянию, в котором он нуждается. Для этого нужно создать две функции: mapStateToProps() и mapDispatchToProps().

В этих функциях вы объявляете, к каким частям состояния вы хотите иметь доступ и какие создатели действий вам нужно отправлять. Как только эти функции будут созданы, вы увидите, как использовать метод React Redux connect для подключения их к вашим компонентам в другой задаче.

Примечание: за кулисами React Redux использует store.subscribe() метод для реализации mapStateToProps().

Создайте функцию mapStateToProps(). Эта функция должна принимать stateв качестве аргумента, а затем возвращать объект, который сопоставляет это состояние с определенными именами свойств. Эти свойства станут доступны вашему компоненту через props. Поскольку в этом примере все состояние приложения хранится в одном массиве, вы можете передать все это состояние своему компоненту. Создайте свойство messagesв возвращаемом объекте и установите для него значение state.

## 06 Отправка карты в Props (Map Dispatch to Props)

mapDispatchToProps() функция используются для обеспечения конкретных действий создателей ваших React компонентов, чтобы они могли направить действия против магазина Redux. По структуре она похожа на mapStateToProps() функцию, которую вы написали в предыдущем задании. Он возвращает объект, который сопоставляет действия отправки с именами свойств, которые становятся компонентами props. Однако вместо того, чтобы возвращать часть state, каждое свойство возвращает функцию, которая вызывает dispatchсоздателя действия и любые соответствующие данные действия. У вас есть доступ к этому , dispatchпотому что он прошел , чтобы в mapDispatchToProps()качестве параметра при определении функции, так же , как вы прошли stateв mapStateToProps(). За кулисами React Redux использует Redux store.dispatch()для проведения этих рассылок mapDispatchToProps(). Это похоже на то, как он используетstore.subscribe()для компонентов, которые сопоставлены state.

Например, у вас есть loginUser()создатель действия, который принимает usernameв качестве полезной нагрузки действия. Объект, возвращаемый mapDispatchToProps()для этого создателя действия, будет выглядеть примерно так:

{
  submitLoginUser: function(username) {
    dispatch(loginUser(username));
  }
}
В редакторе кода есть создатель действия с именем addMessage(). Напишите функцию, mapDispatchToProps()которая принимает dispatchв качестве аргумента, а затем возвращает объект. У объекта должно быть свойство, submitNewMessageнастроенное на функцию отправки, которая принимает параметр для добавления нового сообщения при отправке addMessage().

## 07 Подключите Redux к React (Connect Redux to React)

Теперь, когда вы написали как mapStateToProps() и mapDispatchToProps() функции, вы можете использовать их для отображения state и dispatch к props одной из ваших React компонентов. С этой задачей может справиться метод connect из React Redux. Этот метод принимает два необязательных аргумента mapStateToProps() и mapDispatchToProps(). Они не являются обязательными, потому что у вас может быть компонент, которому нужен только доступ, state но не нужно отправлять какие-либо действия, или наоборот.

Чтобы использовать этот метод, передайте функции в качестве аргументов и немедленно вызовите результат с помощью вашего компонента. Этот синтаксис немного необычен и выглядит так:

connect(mapStateToProps, mapDispatchToProps)(MyComponent)
Примечание. Если вы хотите опустить один из аргументов connect метода, передайте вместо него null.

Редактор кода имеет mapStateToProps() и mapDispatchToProps()функцию и новый компонент под названием React Presentational. Подключите этот компонент к Redux с помощью connectметода ReactReduxглобального объекта и немедленно вызовите его в Presentationalкомпоненте. Назначьте результат новому constвызову, ConnectedComponentкоторый представляет подключенный компонент. Вот и все, теперь вы подключены к Redux! Попробуйте изменить любой из connectаргументов на nullи понаблюдайте за результатами теста.

## 08 Подключите Redux к приложению сообщений (Connect Redux to the Messages App)

Теперь, когда вы понимаете, как использовать connect React для подключения к Redux, вы можете применить полученные знания к своему компоненту React, который обрабатывает сообщения.

На последнем уроке компонент, который вы подключили к Redux, был назван Presentational, и это не было произвольным. Этот термин обычно относится к компонентам React, которые напрямую не связаны с Redux. Они просто несут ответственность за представление пользовательского интерфейса и делают это в зависимости от свойств, которые они получают. Напротив, компоненты контейнера подключены к Redux. Обычно они отвечают за отправку действий в хранилище и часто передают состояние хранилища дочерним компонентам в качестве свойств.

В редакторе кода есть весь код, который вы написали в этом разделе. Единственное изменение - компонент React переименован в Presentational. Создайте новый компонент, содержащий константу с именем, Container которая используется connect для подключения Presentationalкомпонента к Redux. Затем в AppWrapperрендере Providerкомпонента React Redux . Передайте ProviderRedux storeкак опору и выполните рендеринг Containerкак дочерний элемент. Как только все будет настроено, вы снова увидите приложение сообщений, отображаемое на странице.

## 09 Извлечь локальное состояние в Redux (Extract Local State into Redux)

Ты почти сделал! Напомним, что вы написали весь код Redux, чтобы Redux мог контролировать управление состоянием вашего приложения сообщений React. Теперь, когда Redux подключен, вам нужно извлечь управление состоянием из Presentational компонента в Redux. В настоящее время у вас подключен Redux, но вы обрабатываете состояние локально внутри Presentational компонента.

В Presentational компоненте сначала удалите messages свойство в локальном state. Эти сообщения будут обрабатываться Redux. Затем измените submitMessage() метод так, чтобы он отправлялся submitNewMessage() из this.props, и передавал текущее сообщение, введенное из локального state в качестве аргумента. Поскольку вы удалили messages из местного штата, удалите messages свойство из вызова this.setState() сюда. Наконец, измените render() метод так, чтобы он отображал сообщения, полученные от, props-а не state.

После внесения этих изменений приложение продолжит работать так же, за исключением того, что Redux управляет состоянием. Этот пример также иллюстрирует, как компонент может иметь локальное значение state: ваш компонент по-прежнему отслеживает ввод пользователя локально самостоятельно state. Вы можете увидеть, как Redux предоставляет полезную структуру управления состоянием поверх React. Сначала вы достигли того же результата, используя только локальное состояние React, и обычно это возможно с простыми приложениями. Однако по мере того, как ваши приложения становятся больше и сложнее, растет и ваше управление состоянием, и это проблема, которую решает Redux.

## 10 Двигаясь вперед отсюда (Moving Forward From Here)

Поздравляю! Вы закончили уроки по React и Redux. Прежде чем двигаться дальше, стоит отметить еще один момент. Как правило, вы не будете писать приложения React в таком редакторе кода. Эта задача дает вам представление о том, как выглядит синтаксис, если вы работаете с npm и файловой системой на своем собственном компьютере. Код должен выглядеть одинаково, за исключением использования import операторов (они задействуют все зависимости, которые были предоставлены вам в задачах). В разделе «Управление пакетами с помощью npm» npm рассматривается более подробно.

Наконец, написание кода React и Redux обычно требует некоторой настройки. Это может быстро усложниться. Если вы хотите поэкспериментировать на собственном компьютере, приложение Create React уже настроено и готово к работе.

Кроме того, вы можете включить Babel в качестве препроцессора JavaScript в CodePen, добавить React и ReactDOM в качестве внешних ресурсов JavaScript и также работать там.

Зарегистрируйте сообщение 'Now I know React and Redux!'в консоли.
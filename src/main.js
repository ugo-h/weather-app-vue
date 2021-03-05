import { createApp } from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import App from './App.vue'

const requireComponent = require.context(
  // Относительный путь до каталога компонентов
  './components/common',
  // Обрабатывать или нет подкаталоги
  false,
  // Регулярное выражение для определения файлов базовых компонентов
  /V[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Получение конфигурации компонента
  const componentConfig = requireComponent(fileName)

  // Получение имени компонента в PascalCase
  const componentName = upperFirst(
    camelCase(
      // Получаем имя файла независимо от глубины вложенности
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )


  const vueApp = createApp(App)
  // Глобальная регистрация компонента
  vueApp.component(
    componentName,
    // Поиск опций компонента в `.default`, который будет существовать,
    // если компонент экспортирован с помощью `export default`,
    // иначе будет использован корневой уровень модуля.
    componentConfig.default || componentConfig
  )
  vueApp.mount('#app')
})

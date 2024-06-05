import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'

const container = document.getElementById('root')
if (container) {
	const root = createRoot(container)
	root.render(
		<Provider store={store}>
			<React.Fragment>
				<BrowserRouter basename={''}>
					<App />
				</BrowserRouter>
			</React.Fragment>
		</Provider>
	)
}

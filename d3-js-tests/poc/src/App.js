import React, { Component } from "react"
import MonacoEditor from "react-monaco-editor"
import preval from 'babel-plugin-preval/macro'

import './App.css'
import Frame from './Frame'

class App extends Component {
  constructor(props) {
    super(props)

    const fileContents = preval`
      const fs = require('fs')
      module.exports = fs.readFileSync(require.resolve('../public/source_code/sample.html'), 'utf8')
    `

    this.state = {
      code: fileContents,
      options: {
        selectOnLineNumbers: true,
        automaticLayout: true,
      }
    }
  }
  editorDidMount = (editor, monaco) => {
    editor.focus()
  }
  onChange = (newValue, e) => {
    this.setState({
      code: newValue
    })
  }
  render() {
    const { code, options } = this.state
    return (
      <div className="container">
        <div className="me">
          <MonacoEditor
            language="html"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          />
        </div>
        <div className="if">
          <Frame body={this.state.code}></Frame>
        </div>
      </div>
    )
  }
}

export default App

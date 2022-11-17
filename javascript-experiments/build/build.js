({
    baseUrl: "../js_author/",
    paths: {
        'jquery': 'empty:',
        'jquery_ui': 'empty:',
        'jquery_block_ui': 'empty:',
        'text': 'empty:',
        'showdown': 'empty:',
        'MathJax': 'empty:',
        'flot': 'empty:',

        'logme': 'logme',
        'hotfix': 'hotfix',
        'Output': 'output',
        'ModuleDiv': 'module_div',
        'RunModules': 'run_modules',
        'Controller': 'controller',
        'ContentManager': 'content_manager',
        'pipeline': 'pipeline',
        'showHideGitHubRibbon': 'show_hide_gh_ribbon',
        'MathJaxLoader': 'mathjax_loader',

        'ExtMd': 'ext/md'
    },
    name: "main",
    out: "../build/main.min.js",
    preserveLicenseComments: false
})

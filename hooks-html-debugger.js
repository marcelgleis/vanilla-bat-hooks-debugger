class HooksHtmlDebugger {

    rootNode;

    append(event, hook, action, args, result) {
        const charCount = 50;
        let now = new Date();
        let timeStr =
            now.getHours().toString().padStart(2, '0')
            + ':'
            + now.getMinutes().toString().padStart(2, '0')
            + ':'
            + now.getSeconds().toString().padStart(2, '0')
            + ','
            + now.getMilliseconds().toString().padStart(3, '0');
        let argsStr = (JSON.stringify(args) || '').substr(0, charCount);
        if (argsStr.length == charCount) {
            argsStr += '...';
        }
        if (argsStr == '[]') {
            argsStr = '';
        }
        let argsPrettyStr = JSON.stringify(args, null, 2) || '';
        let resultStr = (JSON.stringify(result) || '').substr(0, charCount);
        if (resultStr.length == charCount) {
            resultStr += '...';
        }
        let resultPrettyStr = JSON.stringify(result, null, 2) || '';

        let row = document.createElement('tr');
        row.dataset.event = event;
        row.insertAdjacentHTML('beforeend',
            '<td>' + timeStr + "</td>" +
            '<td>' + event + '</td>' +
            '<td>' + hook + '</td>' +
            '<td>' + action + "</td>" +
            '<td>' + argsStr + "</td>" +
            '<td>' + resultStr + '</td>'
        );
        this.rootNode.appendChild(row);
    }


    constructor(hooks, domNode) {

        this.rootNode = this.createRootNode(domNode);

        let that = this;

        hooks.register('hooks_action_register', 'debug hooks_action_register', function(actionDef) {
            that.append('hooks_action_register', actionDef.hookName, actionDef.actionName);
        });
        hooks.register('hooks_actions_execute', 'debug hooks_actions_execute', function(hookName, args) {
            that.append('hooks_actions_execute', hookName, '', args);
        });
        hooks.register('hooks_action_execute', 'debug hooks_action_execute', function(actionDef, args) {
            that.append('hooks_action_execute', actionDef.hookName, actionDef.actionName, args);
        });
        hooks.register('hooks_action_executed', 'debug hooks_action_executed', function(actionDef, result, args) {
            that.append('hooks_action_executed', actionDef.hookName, actionDef.actionName, args, result);
        });
        hooks.register('hooks_actions_executed', 'debug hooks_actions_executed', function(hookName, args) {
            that.append('hooks_actions_executed', hookName, '', args);
        });
    }

    createRootNode(domNode) {
        let tableNode = document.createElement('table');
        domNode.appendChild(tableNode);

        tableNode.insertAdjacentHTML('beforeend',
            '<tr>' +
                '<th>Time</th>' +
                '<th>Event</th>' +
                '<th>Hook</th>' +
                '<th>Action</th>' +
                '<th>Arguments</th>' +
                '<th>Result</th>' +
            '</tr>'
        );

        return tableNode;
    }

}
class HooksLogDebugger {
    constructor(hooks, log) {

        log = log || console.log || function() {};

        hooks.register('hooks_action_register', 'debug hooks_action_register', function(actionDef) {
            log('- > hooks_action_register: hook=' + actionDef.hookName + ', action="' + actionDef.actionName + '"');
        });
        hooks.register('hooks_actions_execute', 'debug hooks_actions_execute', function(hookName) {
            log('- > hooks_actions_execute: hook=' + hookName, arguments);
        });
        hooks.register('hooks_action_execute', 'debug hooks_action_execute', function(actionDef, args) {
            log('-- > hooks_action_execute: hook=' + actionDef.hookName + ', action="' + actionDef.actionName + '"', args);
        });
        hooks.register('hooks_action_executed', 'debug hooks_action_executed', function(actionDef, result, args) {
            log('-- < hooks_action_executed: hook=' + actionDef.hookName + ', action="' + actionDef.actionName + '"', result, args);
        });
        hooks.register('hooks_actions_executed', 'debug hooks_actions_executed', function(hookName) {
            log('- < hooks_actions_executed', arguments);
        });
    }
}

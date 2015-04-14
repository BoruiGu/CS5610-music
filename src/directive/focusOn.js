app.directive('focusOn', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.focusOn, function (newVal, oldVal) {
                $timeout(function () {
                    if (newVal) {
                        element.focus();
                    }
                });
            });
        }
    };
});
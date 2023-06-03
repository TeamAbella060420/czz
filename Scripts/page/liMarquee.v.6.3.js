(function ($) {
    'use strict';
    var methods = {
        init: function (_opts) {
            var _p = {
                width: 'auto',
                height: 'auto',
                direction: 'left',//Sets the direction of the Marquee. It may take the values: "left", "right", "top", "bottom"
                scrollDelay: 85,
                scrollAmount: 6,
                circular: false,
                dragAndDrop: true,
                hoverStop: true,
                scrollStop: true,
                startShow: false,
                xml: false,
                touchEvent: true,
                stopOutScreen: true,
                create: function () { },
                moveStart: function () { },
                moveStop: function () { },
                drag: function () { },
                dragStart: function () { },
                dragStop: function () { },
                wayEnd: function () { },
                removeContentFadeDuration: 300
            };
            if (_opts) {
                $.extend(_p, _opts)
            };
            return this.each(function () {
                var _b5 = $(this).addClass('mWrap');
                var _b6 = $('*').index($(this));
                _b5.data()['mElIndex'] = _b6;
                var _b7 = function (_b8, _b9) {
                    var _ba = _b8.position();
                    var _bb = _b9 || $(document);
                    var _bc = (_bb.outerWidth() - (_b8.position().left + _b8.outerWidth()));
                    var _bd = (_bb.outerHeight() - (_b8.position().top + _b8.outerHeight()));
                    var _be = {
                        right: _bc,
                        bottom: _bd
                    };
                    $.extend(_be, _ba);
                    return _be
                };
                _b5.data().style = _b5.attr('style');
                $.extend(_p, _b5.data());
                $.extend(_b5.data(), _p);
                if (!$('.mMove', _b5).length) {
                    _b5.wrapInner('<div class="mMove"></div>')
                };
                var _bf = $('.mMove', _b5);
                _b5.css({
                    position: 'relative',
                    overflow: 'hidden',
                    maxWidth: '100%',
                    height: _b5.data().height,
                    width: _b5.data().width
                });
                if (_b5.data()['scrollDelay'] <= 0) {
                    _b5.data()['scrollDelay'] = 85
                };
                _b5.data()['outerSizeFunc'] = function (_b8) {
                    if (_b5.data()['direction'] === 'top' || _b5.data()['direction'] === 'bottom') {
                        return _b8.outerHeight()
                    } else {
                        return _b8.outerWidth()
                    }
                };
                _bf.data().style = _bf.attr('style');
                if ((!_b5.data()['updateCont'])) {
                    _bf.css({
                        position: 'absolute',
                        left: 'auto',
                        right: 'auto',
                        top: 'auto',
                        bottom: 'auto',
                        float: 'left'
                    })
                };
                _b5.data()['mMove'] = _bf;
                var $0 = function () {
                    _b5.data()['clickEventFlag'] = true;
                    if (_b5.data()['outerSizeFunc'](_bf) > 0) {
                        var $1 = $('.mItem', _b5);
                        $1.each(function () {
                            $(this).data().style = $(this).attr('style');
                            $(this).css({
                                display: 'inline',
                                zoom: 1
                            })
                        });
                        var $2 = function ($3, $1) {
                            $1.css({
                                paddingLeft: 0,
                                paddingRight: 0,
                                paddingTop: 0,
                                paddingBottom: 0
                            });
                            if ($1.length && !_b5.data()['circular']) {
                                var $4 = {};
                                var $5 = {};
                                $4['padding-' + $3] = _b5.data()['outerSizeFunc'](_b5);
                                $5['padding-' + $3] = 0;
                                $1.css($4);
                                $1.eq(0).css($5)
                            }
                        };
                        _b5.data()['splittingString'] = $2;
                        var $6 = $('<div>').addClass('cloneContent').html(_bf.html());
                        if (_b5.data()['direction'] === 'left' || _b5.data()['direction'] === 'right') {
                            _bf.css({
                                whiteSpace: 'nowrap'
                            });
                            _b5.data()['splittingString']('left', $1);
                            _b5.css({
                                minHeight: _bf.outerHeight()
                            });
                            $6.css({
                                display: 'inline-block'
                            });
                            _b5.data()['axis'] = 'hor'
                        } else {
                            _bf.css({
                                whiteSpace: 'normal'
                            });
                            $1.css({
                                display: 'block'
                            });
                            _b5.data()['splittingString']('top', $1);
                            if (_b5.outerHeight() === 0) {
                                alert('Set Height Parametr for Plugin liMarquee')
                            };
                            $6.css({
                                display: 'block'
                            });
                            _b5.data()['axis'] = 'vert'
                        };
                        var $7 = false || document['documentMode'];
                        if ($7) {
                            _b5.add(_b5.find('*')).attr('unselectable', 'on')
                        };
                        var $8 = 'mousemove.' + _b5.data()['mElIndex'];
                        var $9 = 'mousedown.' + _b5.data()['mElIndex'];
                        var $a = 'mouseup.' + _b5.data()['mElIndex'];
                        var $b = 'click.' + _b5.data()['mElIndex'];
                        _b5.data({
                            touchScreen: false,
                            teleport: false,
                            dragging: false,
                            pause: false
                        });
                        if ('ontouchstart' in window) {
                            $8 = 'touchmove.' + _b5.data()['mElIndex'];
                            $9 = 'touchstart.' + _b5.data()['mElIndex'];
                            $a = 'touchend.' + _b5.data()['mElIndex'];
                            _b5.data()['touchScreen'] = true;
                            if ($(window).width() < 1000) {
                                _b5.data()['hoverStop'] = false
                            }
                        };
                        _b5.data({
                            moveEvent: $8,
                            mousedownEvent: $9,
                            mouseupEvent: $a,
                            clickEvent: $b
                        });
                        var $c = function (_bf) {
                            if (_b5.data()['outerSizeFunc'](_bf) !== 0) {
                                if (_b5.data()['outerSizeFunc'](_bf) < _b5.data()['outerSizeFunc'](_b5) && _b5.data()['circular']) {
                                    $6.clone().appendTo(_bf);
                                    _b5.data()['cloneContent'](_bf)
                                }
                            } else {
                                console.log('The string is empty or contains invalid style')
                            }
                        };
                        _b5.data()['cloneContent'] = $c;
                        _b5.data()['cloneContent'](_bf);
                        var $d = function ($e, $f) {
                            if (!_b5.data()['pause']) {
                                if ($e === undefined) {
                                    $e = _b5.data()['startPos']
                                };
                                if ($f === undefined) {
                                    $f = _b5.data()['endPos']
                                };
                                if ($f !== 0 && $f !== -0) {
                                    var methods0 = ($f - $e);
                                    if (methods0 < 0) {
                                        methods0 = methods0 * -1
                                    };
                                    var methods1 = (methods0 * _b5.data()['scrollDelay']) / _b5.data()['scrollAmount'];
                                    var methods2 = {};
                                    var methods3 = {};
                                    methods2[_b5.data()['direction']] = $e;
                                    methods3[_b5.data()['direction']] = $f;
                                    _bf.css(methods2);
                                    _b5.addClass('mIni');
                                    _b5.data()['stopped'] = false;
                                    if (_b5.data()['moveStart'] !== undefined) {
                                        _b5.data()['moveStart']()
                                    };
                                    _bf.stop(true).animate(methods3, methods1, 'linear',
                                    function () {
                                        if (_b5.data()['moveStop'] !== undefined) {
                                            _b5.data()['moveStop']()
                                        };
                                        if (_b5.data()['wayEnd'] !== undefined) {
                                            _b5.data()['wayEnd']()
                                        };
                                        _b5.data()['teleport'] = true;
                                        $d()
                                    })
                                }
                            }
                        };
                        _b5.data()['anim'] = $d;
                        var methods4 = function () {
                            var methods5 = _bf.clone().addClass('clone').css({
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                opacity: 0
                            });
                            if (_b5.data()['direction'] === 'top' || _b5.data()['direction'] === 'bottom') {
                                methods5.css({
                                    left: 0
                                })
                            } else {
                                methods5.css({
                                    top: 0
                                })
                            };
                            var methods6 = {};
                            var methods7 = {};
                            methods6[_b5.data()['direction']] = '-100%';
                            methods7[_b5.data()['direction']] = '100%';
                            var methods8 = methods5.clone().addClass('cloneBefore').css(methods6).appendTo(_bf);
                            var methods9 = methods5.clone().addClass('cloneAfter').css(methods7).appendTo(_bf);
                            if (_b5.data()['circular']) {
                                methods8.add(methods9).css({
                                    opacity: 1
                                })
                            }
                        };
                        if (_b5.data()['circular']) {
                            methods4()
                        };
                        if (_b5.data()['create'] !== undefined) {
                            _b5.data()['create']()
                        };
                        var methodsa = function () {
                            return _b7(_bf, _b5)[_b5.data()['direction']]
                        };
                        _b5.data()['nowPos'] = methodsa;
                        var methodsb = function (methodsc) {
                            var methodsd = methodsc;
                            if (_b5.data()['touchScreen']) {
                                if (methodsc['originalEvent']['targetTouches'].length === 1) {
                                    methodsd = methodsc['originalEvent']['targetTouches'][0]
                                }
                            };
                            var methodse = {
                                left: methodsd['pageX'],
                                top: methodsd['pageY'],
                                right: ($(window).width() - methodsd['pageX']),
                                bottom: ($(window).height() - methodsd['pageY'])
                            };
                            $.extend(methodsd, methodse);
                            return methodsd
                        };
                        if (_b5.data()['hoverStop']) {
                            _b5['on']('mouseenter.' + _b5.data()['mElIndex'],
                            function () {
                                _b5.off('mouseleave.' + _b5.data()['mElIndex']);
                                if (_b5.data()['dragAndDrop']) {
                                    $('html').addClass('grab')
                                };
                                if (!_b5.data()['stopped']) {
                                    _bf.stop(true);
                                    _b5.data()['stopped'] = true;
                                    if (_b5.data()['moveStop'] !== undefined) {
                                        _b5.data()['moveStop']()
                                    }
                                };
                                _b5['on']('mouseleave.' + _b5.data()['mElIndex'],
                                function () {
                                    $(document).off($8);
                                    $('html').removeClass('grab');
                                    $('html').removeClass('grabbing');
                                    $d(_b5.data()['nowPos']())
                                })
                            })
                        };
                        if (!_b5.data()['touchScreen'] && _b5.data()['dragAndDrop'] || _b5.data()['touchScreen'] && _b5.data()['touchEvent']) {
                            _b5['on']($9,
                            function (methodsc) {
                                $(document).off($8);
                                $(document).off($a);
                                _b5.off('mouseleave.' + _b5.data()['mElIndex']);
                                $('html').addClass('grabbing');
                                if (!_b5.data()['stopped']) {
                                    _bf.stop(true);
                                    _b5.data()['stopped'] = true;
                                    if (_b5.data()['moveStop'] !== undefined) {
                                        _b5.data()['moveStop']()
                                    }
                                };
                                var methodsf = methodsb(methodsc)[_b5.data()['direction']];
                                var _opts0 = methodsb(methodsc).top;
                                var _opts1 = methodsb(methodsc).left;
                                var _opts2 = 0;
                                var _opts3 = 0;
                                var _opts4 = 1;
                                $(document)['on']($8,
                                function (methodsc) {
                                    _b5.data()['clickEventFlag'] = false;
                                    _b5.off('mouseleave.' + _b5.data()['mElIndex']);
                                    $('html').addClass('grabbing');
                                    if (!_b5.data()['dragging']) {
                                        if (_b5.data()['dragStart'] !== undefined) {
                                            _b5.data()['dragStart']()
                                        };
                                        _b5.data()['dragging'] = true
                                    };
                                    var _opts5 = _b5.data()['nowPos']();
                                    if (!_b5.data()['stopped']) {
                                        _bf.stop(true);
                                        _b5.data()['stopped'] = true
                                    };
                                    var _opts6 = methodsb(methodsc)[_b5.data()['direction']];
                                    var _opts7 = function () {
                                        if (_opts6 > methodsf) {
                                            _opts4 = 1
                                        };
                                        if (_opts6 < methodsf) {
                                            _opts4 = -1
                                        };
                                        var _opts8 = (methodsf - _opts6);
                                        methodsf = _opts6;
                                        var methods6 = {};
                                        methods6[_b5.data()['direction']] = '-=' + _opts8;
                                        if (_b5.data()['circular']) {
                                            if (_opts5 <= _b5.data()['outerSizeFunc'](_bf) && !_b5.data()['teleport']) {
                                                _b5.data()['teleport'] = true
                                            };
                                            if (_opts5 <= (_b5.data()['outerSizeFunc'](_b5) - _b5.data()['outerSizeFunc'](_bf)) && _opts4 < 0 && _b5.data()['teleport']) {
                                                if (_b5.data()['wayEnd'] !== undefined) {
                                                    _b5.data()['wayEnd']()
                                                };
                                                methods6[_b5.data()['direction']] = '+=' + _b5.data()['outerSizeFunc'](_bf)
                                            };
                                            if (_opts5 >= 0 && _opts4 > 0 && _b5.data()['teleport']) {
                                                if (_b5.data()['wayEnd'] !== undefined) {
                                                    _b5.data()['wayEnd']()
                                                };
                                                methods6[_b5.data()['direction']] = '-=' + _b5.data()['outerSizeFunc'](_bf)
                                            }
                                        } else {
                                            if (_opts5 <= -_b5.data()['outerSizeFunc'](_bf) && _opts4 < 0) {
                                                if (_b5.data()['wayEnd'] !== undefined) {
                                                    _b5.data()['wayEnd']()
                                                };
                                                methods6[_b5.data()['direction']] = '+=' + (_b5.data()['outerSizeFunc'](_bf) + _b5.data()['outerSizeFunc'](_b5))
                                            };
                                            if (_opts5 >= _b5.data()['outerSizeFunc'](_b5) && _opts4 > 0) {
                                                if (_b5.data()['wayEnd'] !== undefined) {
                                                    _b5.data()['wayEnd']()
                                                };
                                                methods6[_b5.data()['direction']] = '-=' + (_b5.data()['outerSizeFunc'](_bf) + _b5.data()['outerSizeFunc'](_b5))
                                            }
                                        };
                                        if (_b5.data()['drag'] !== undefined) {
                                            _b5.data()['drag']()
                                        };
                                        _bf.css(methods6);
                                        if (_b5.data()['touchEvent']) {
                                            return false
                                        }
                                    };
                                    if (_b5.data()['axis'] == 'hor') {
                                        var _opts9 = methodsb(methodsc).top;
                                        var _optsa = methodsb(methodsc).left;
                                        var _optsb = Math.abs(_opts9 - _opts0);
                                        var _optsc = Math.abs(_optsa - _opts1);
                                        _opts2 += _optsb;
                                        _opts3 += _optsc;
                                        if (_opts2 > _opts3) {
                                            $(document).trigger($a)
                                        } else {
                                            _opts7()
                                        }
                                    } else {
                                        _opts7()
                                    }
                                });
                                $(document)['on']($a,
                                function (methodsc) {
                                    if (_b5.data()['dragging']) {
                                        if (_b5.data()['dragStop'] !== undefined) {
                                            _b5.data()['dragStop']()
                                        };
                                        _b5.data()['dragging'] = false
                                    };
                                    if ($(methodsc['target']).is(_b5) || $(methodsc['target']).closest(_b5).length) {
                                        $(document).off($8);
                                        $('html').removeClass('grabbing');
                                        if (_b5.data()['hoverStop']) {
                                            _b5.trigger('mouseenter.' + _b5.data()['mElIndex'])
                                        } else {
                                            $d(_b5.data()['nowPos']())
                                        }
                                    } else {
                                        $(document).off($8);
                                        $d(_b5.data()['nowPos']());
                                        $('html').removeClass('grab');
                                        $('html').removeClass('grabbing')
                                    };
                                    $(document).off($a);
                                    setTimeout(function () {
                                        _b5.data()['clickEventFlag'] = true
                                    },
                                    300)
                                });
                                if (!_b5.data()['touchScreen']) {
                                    return false
                                }
                            })
                        };
                        var _optsd = function (_b5) {
                            var _bf = _b5.data()['mMove'];
                            var _optse = _b5.data()['outerSizeFunc'](_b5);
                            var _optsf = -_b5.data()['outerSizeFunc'](_bf);
                            _b5.data()['startPos'] = _optse;
                            _b5.data()['endPos'] = _optsf;
                            if (_b5.data()['circular']) {
                                _optsf = -(_b5.data()['outerSizeFunc'](_bf) + (_b5.data()['outerSizeFunc'](_bf) - _b5.data()['outerSizeFunc'](_b5)));
                                _b5.data()['endPos'] = _optsf;
                                var _p0 = _b5.data()['startShow'] ? _b5.data()['outerSizeFunc'](_bf) : (_b5.data()['outerSizeFunc'](_b5) + _b5.data()['outerSizeFunc'](_bf));
                                $d(_p0)
                            } else {
                                var _p1 = _b5.data()['startShow'] ? 0 : _optse;
                                $d(_p1)
                            }
                        };
                        _b5.data()['getPosition'] = _optsd;
                        var _p2 = function (_b5) {
                            var _bf = _b5.data()['mMove'];
                            var _optse = _b5.data()['outerSizeFunc'](_b5);
                            var _optsf = -_b5.data()['outerSizeFunc'](_bf);
                            _b5.data()['startPos'] = _optse;
                            _b5.data()['endPos'] = _optsf;
                            if (_b5.data()['circular']) {
                                _optsf = -(_b5.data()['outerSizeFunc'](_bf) + (_b5.data()['outerSizeFunc'](_bf) - _b5.data()['outerSizeFunc'](_b5)));
                                _b5.data()['endPos'] = _optsf
                            }
                        };
                        _b5.data()['setPosition'] = _p2;
                        if (!_b5.data()['updateCont']) {
                            _b5.data()['getPosition'](_b5)
                        };
                        var _p3 = function () {
                            if (document['hidden']) {
                                if (!_b5.data()['stopped']) {
                                    _bf.stop(true);
                                    _b5.data()['stopped'] = true;
                                    if (_b5.data()['moveStop'] !== undefined) {
                                        _b5.data()['moveStop']()
                                    }
                                }
                            } else {
                                $d(_b5.data()['nowPos']())
                            }
                        };
                        $(document)['on']('visibilitychange',
                        function () {
                            _p3()
                        });
                        var _p4 = function () { };
                        $(window)['on']('resize.' + _b5.data()['mElIndex'],
                        function () {
                            clearTimeout(_p4);
                            _p4 = setTimeout(function () {
                                _b5['liMarquee']('resetPosition')
                            },
                            300)
                        });
                        var _p5 = function () { };
                        var _p6 = function () {
                            if (_b5.data()['stopOutScreen']) {
                                if ((_b5.offset().top + _b5.outerHeight()) < $(window).scrollTop() || _b5.offset().top > ($(window).scrollTop() + $(window).height())) {
                                    if (!_b5.data()['stopped']) {
                                        _bf.stop(true);
                                        _b5.data()['stopped'] = true;
                                        if (_b5.data()['moveStop'] !== undefined) {
                                            _b5.data()['moveStop']()
                                        }
                                    }
                                } else {
                                    $d(_b5.data()['nowPos']())
                                }
                            } else {
                                $d(_b5.data()['nowPos']())
                            }
                        };
                        $(window)['on']('scroll.' + _b5.data()['mElIndex'],
                        function () {
                            if (_b5.data()['scrollStop'] && !_b5.data()['stopped']) {
                                _bf.stop(true);
                                _b5.data()['stopped'] = true;
                                if (_b5.data()['moveStop'] !== undefined) {
                                    _b5.data()['moveStop']()
                                }
                            };
                            clearTimeout(_p5);
                            _p5 = setTimeout(function () {
                                _p6()
                            },
                            100)
                        });
                        _b5.find('a')['on']('click',
                        function () {
                            if (!_b5.data()['clickEventFlag']) {
                                return false
                            }
                        });
                        _p6()
                    } else {
                        _bf['text']('marquee "' + _b5.attr('class') + '" elements is hidden or missing');
                        $0();
                        _b5['liMarquee']('stop');
                        _b5['liMarquee']('removeContent')
                    }
                };
                if (_b5.data()['xml']) {
                    $.ajax({
                        url: _b5.data()['xml'],
                        dataType: 'xml',
                        success: function (_p7) {
                            var _p8 = $(_p7).find('item');
                            var _p9 = _p8.length;
                            for (var _pa = 0; _pa < _p9; _pa++) {
                                var _pb = _p8.eq(_pa);
                                var _pc = _pb.find('title')['text']();
                                var _pd = _pb.find('link')['text']();
                                if (_pb.find('link').length) {
                                    $('<div class="mItem"><a href="' + _pd + '">' + _pc + '</a></div>').appendTo(_bf)
                                } else {
                                    $('<div class="mItem">')['text'](_pc).appendTo(_bf)
                                }
                            };
                            $0()
                        }
                    })
                } else {
                    $0()
                }
            })
        },
        getContent: function () {
            var _bf = $(this).data()['mMove'];
            var _pe;
            if (!_bf.is(':empty')) {
                var _pf = _bf.html();
                var _b50 = $('<div>').html(_pf);
                _b50.find('.clone').remove();
                _b50.find('.cloneContent').remove();
                _pe = $.trim(_b50.html())
            } else {
                _pe = false
            };
            return _pe
        },
        addContent: function (_b51) {
            return this.each(function () {
                var _b5 = $(this);
                var _bf = _b5.data()['mMove'];
                var _b52 = function () {
                    if (!_b5.data()['removing']) {
                        var _b53 = '<div class="mItem">' + _b51 + '</div>';
                        var _b54 = _b5['liMarquee']('getContent');
                        var _b55 = _b54;
                        if (!_bf.find('.mItem').length && _b54) {
                            _b54 = '<div class="mItem">' + _b54 + '</div>'
                        };
                        if (_b51) {
                            if (_b5.data()['direction'] === 'left' || _b5.data()['direction'] === 'top') {
                                _b55 = _b54 ? _b54 + _b53 : _b53
                            };
                            if (_b5.data()['direction'] === 'right' || _b5.data()['direction'] === 'bottom') {
                                _b55 = _b54 ? _b53 + _b54 : _b53
                            }
                        };
                        _b5['liMarquee']('removeContent');
                        var _b56 = function () {
                            if (!_b5.data()['removing']) {
                                _bf.html(_b55);
                                if (_b54) {
                                    _b5.data()['updateCont'] = true
                                };
                                _b5['liMarquee'](_b5.data());
                                if (_b5.data()['updateCont']) {
                                    _b5.data()['setPosition'](_b5);
                                    _b5.data()['anim'](_b5.data()['nowPos']())
                                }
                            } else {
                                setTimeout(function () {
                                    _b56()
                                },
                                _b5.data()['removeContentFadeDuration'])
                            }
                        };
                        _b56()
                    } else {
                        setTimeout(function () {
                            _b52()
                        },
                        _b5.data()['removeContentFadeDuration'])
                    }
                };
                _b52()
            })
        },
        removeContent: function () {
            return this.each(function () {
                $(this).data()['removing'] = true;
                var _b5 = $(this);
                var _bf = _b5.data()['mMove'];
                _bf.children().animate({
                    opacity: 0
                },
                _b5.data()['removeContentFadeDuration']);
                setTimeout(function () {
                    _b5.data()['updateCont'] = true;
                    if (!_b5.data()['stopped']) {
                        _bf.stop(true);
                        _b5.data()['stopped'] = true
                    };
                    _b5.off('mouseenter.' + _b5.data()['mElIndex']);
                    _b5.off('mouseleave.' + _b5.data()['mElIndex']);
                    _b5.off($(this).data()['mousedownEvent']);
                    $(window).off('resize.' + _b5.data()['mElIndex']);
                    $(window).off('scroll.' + _b5.data()['mElIndex']);
                    $(document).off(_b5.data()['moveEvent']);
                    $(document).off(_b5.data()['mouseupEvent']);
                    if (!_b5.data()['stopped']) {
                        _bf.stop(true);
                        _b5.data()['stopped'] = true
                    };
                    _bf.empty();
                    _b5.data()['removing'] = false
                },
                _b5.data()['removeContentFadeDuration'])
            })
        },
        changeOptions: function (_opts) {
            return this.each(function () {
                var _b5 = $(this);
                $.extend(_b5.data(), _opts);
                _b5['liMarquee']('destroy');
                _b5.data()['updateCont'] = false;
                _b5['liMarquee'](_b5.data())
            })
        },
        destroy: function () {
            var _b5 = $(this);
            var _bf = _b5.data()['mMove'];
            _b5.removeAttr('style').attr('style', _b5.data().style);
            if (!_b5.data()['stopped']) {
                _bf.stop(true);
                _b5.data()['stopped'] = true
            };
            _bf.removeAttr('style').attr('style', _bf.data().style).removeData();
            $('.mItem', _b5).each(function () {
                $(this).removeAttr('style').attr('style', $(this).data().style).removeData()
            });
            _b5.off('mouseenter.' + _b5.data()['mElIndex']);
            _b5.off('mouseleave.' + _b5.data()['mElIndex']);
            _b5.off(_b5.data()['mousedownEvent']);
            $(window).off('resize.' + _b5.data()['mElIndex']);
            $(window).off('scroll.' + _b5.data()['mElIndex']);
            if (_b5.data()['moveEvent']) {
                $(document).off(_b5.data()['moveEvent'])
            };
            if (_b5.data()['mouseupEvent']) {
                $(document).off(_b5.data()['mouseupEvent'])
            };
            $('.clone', _b5).remove();
            $('.cloneContent', _b5).remove();
            var _b57 = _bf.html();
            _bf.remove();
            _b5.html(_b57).removeClass('mIni').css({
                opacity: 1
            })
        },
        stop: function () {
            return this.each(function () {
                var _b5 = $(this);
                if (_b5.is('.mIni')) {
                    var _bf = _b5.data()['mMove'];
                    if (!_b5.data()['pause']) {
                        _b5.data()['pause'] = true;
                        if (!_b5.data()['stopped']) {
                            _bf.stop(true);
                            _b5.data()['stopped'] = true;
                            if (_b5.data()['moveStop'] !== undefined) {
                                _b5.data()['moveStop']()
                            }
                        }
                    }
                }
            })
        },
        start: function (_b58) {
            return this.each(function () {
                var _b5 = $(this);
                if (_b5.data()['pause']) {
                    var _b59 = _b58 ? _b58 : 0;
                    setTimeout(function () {
                        _b5.data()['pause'] = false;
                        _b5.data()['setPosition'](_b5);
                        _b5.data()['anim'](_b5.data()['nowPos']());
                        $(window).trigger('scroll.' + _b5.data()['mElIndex'])
                    },
                    _b59)
                }
            })
        },
        resetPosition: function () {
            return this.each(function () {
                var _b5 = $(this);
                if (_b5.is(':visible')) {
                    var _bf = _b5.data()['mMove'];
                    if (!_b5.data()['stopped']) {
                        _bf.stop(true);
                        _b5.data()['stopped'] = true
                    };
                    if (_b5.data()['direction'] === 'left' || _b5.data()['direction'] === 'right') {
                        _b5.css({
                            minHeight: _bf.outerHeight()
                        })
                    };
                    _b5.data()['setPosition'](_b5);
                    _b5.data()['anim'](_b5.data()['nowPos']());
                    $(window).trigger('scroll.' + _b5.data()['mElIndex'])
                }
            })
        }
    };


    $.fn.liMarquee = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method  ' + method + ' in jQuery.liMarquee does not exist ');
            }
        }
    }
})(jQuery)
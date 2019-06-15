/**
 * @author renjiefang
 * @date  2019-06-11 17:40
 */
$(function() {

    let  poke = [];
    let  rule = ['h','s','c','d']
     let flag = []

       for(let i = 0; i < 52; i++) {
           let number = Math.floor(Math.random()*13+1)
           let  color = rule[Math.floor(Math.random()*rule.length)]
           if(flag[number+'_'+color]){
               i--
               continue
           }
           poke.push({number,color})
           flag[number+'_'+color] = true
       }
       console.log(poke);

     let index = -1
     for(let i = 0; i <5; i++) {
         for(let j = 0; j <= i; j++) {
             index++
              let lefts = 350-50*i+100*j;
               let tops = 100*i;
               console.log(tops);
             $('<div>').addClass('poke')
                 .attr('id', `${i}_${j}`)
                 .data('number',poke[index].number)
                 .appendTo('.box')
                 .css({'backgroundImage': `url(./images/${poke[index].number}${poke[index].color}.jpg)`})
                 .delay(index * 100)
                 .animate({left: 700, top: 200, opacity: 0.5})
                 .animate({left: lefts, top: tops, opacity: 1})
         }
     }

     for(; index <52; index++) {
         $('<div>')
             .addClass('poke')
             .addClass('left')
             .attr('id', '-2_-2')
             .data('number',poke[index].number)
             .appendTo('.box')
             .css({'backgroundImage':`url(./images/${poke[index].number}${poke[index].color}.jpg)`})
             .delay(index*50)
             .animate({left:0, top:600,opacity:1})
     }

      let first = null;
     //抬牌
       $('.box').on('click', '.poke', function() {
               let _this = $(this)
               let [id1,id2] = _this.attr('id').split("_")
               let idn = id1*1+1+'_'+(id2)
               let idnn = id1*1+1+'_'+(id2*1+1)

           if($('#'+idn).length || $('#'+idnn).length) {
               return ;
           }
           if(_this.hasClass('active')) {
               _this.animate({top: '+=30px'},function() {
                        $(this).removeClass('active')
               })

           }
           else {
               _this.addClass('active').animate({top: '-=30px'})
           }

           if(!first) {
               first = _this;
           }

           else {
                console.log(first.attr('id'), _this.attr('id'));
                if(first.attr('id') == _this.attr('id')) {
                    console.log(11111);
                    first = null
                    return ;
                }
                let firstnumber = first.data('number')
                 let currnumber = _this.data('number')
               console.log(firstnumber, currnumber);
               if(firstnumber+currnumber >10){
                     first.animate({right: '0px',top: '0px',opacity: 0},function() {
                            $(this).remove()
                     })
                   _this.animate({right: '0px',top: '0px',opacity: 0},function() {
                       $(this).remove()
                   })
                   first = null

               }else {
                   $('.active').animate({top: '+=30px'},function() {
                         $(this).removeClass('active')
                   })

                   first = null
               }
           }


       })


    //左边纸牌
    let n = 0
     $('.btnRight').on('click', function() {
          $('.left').last().css({zIndex: n++}).animate({left: '700px', top:'600px'},function() {
                 $(this).removeClass('left').addClass('haha')
          })

     })

    $('.btnLeft').on('click', function() {
        $('.haha').first().css({zIndex: n++}).animate({left: '0px', top:'600px'},function() {
            $(this).removeClass('haha').addClass('left')
        })

    })


})
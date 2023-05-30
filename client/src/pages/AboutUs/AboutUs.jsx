import React from 'react'
import Block from './Block'
import A_1 from '../../assets/a_1.png'
import A_2 from '../../assets/a_2.png'
import A_3 from '../../assets/a_3.png'
import A_4 from '../../assets/a_4.png'
import A_5 from '../../assets/a_5.png'

const AboutUs = () => {
  return (
    <div className='mx-6'>
        <h1 className='font-semibold text-5xl mb-24'>История ресторана</h1>
        <Block text='Ресторан "Аромат" начал свою историю более десяти лет назад, когда его основатель - опытный шеф-повар Дмитрий - решил открыть свой собственный ресторан.<br />
Его целью было создание места, где люди могли бы наслаждаться не только вкусной едой, но и уютной атмосферой и высоким уровнем обслуживания.' img={A_1} reverse ={false}/>
        <Block text='С самого начала "Аромат" был знаменит своими блюдами, приготовленными из свежих и качественных продуктов, а также необычными сочетаниями вкусов.<br />
В меню всегда можно найти как классические блюда европейской кухни, так и экзотические блюда из разных уголков мира.' img={A_2} reverse ={true}/>
        <Block text='Кроме того, "Аромат" всегда был известен своим приветливым и дружелюбным персоналом, который старается сделать посещение ресторана максимально комфортным и приятным для каждого гостя.<br />
Все официанты и бармены проходят специальное обучение, чтобы обеспечивать высокий уровень сервиса и учитывать все индивидуальные пожелания посетителей.' img={A_3} reverse ={false}/>
        <Block text='Со временем ресторан "Аромат" стал одним из самых популярных мест для проведения различных мероприятий, таких как свадьбы, юбилеи и корпоративные вечеринки.<br />
Для этого была создана отдельная команда организаторов, которая помогала гостям в планировании и проведении их мероприятий.' img={A_4} reverse ={false}/>
        <Block text='Сегодня "Аромат" продолжает радовать своих посетителей изысканной едой, уютной атмосферой и высоким уровнем обслуживания. <br />
Ресторан постоянно совершенствует свое меню и сервис, чтобы удовлетворить все потребности своих гостей и оставить только самые приятные впечатления от посещения.' img={A_5} reverse ={false}/>
    </div>
  )
}

export default AboutUs
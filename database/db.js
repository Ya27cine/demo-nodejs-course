/**
     * Opertaions 
     * eq:   ( equal)
     * ne:   ( no equal )
     * gt:   ( greater than)
     * gte:  ( greater than or eq to)
     * lt:   ( less than)
     * lte:  ( less than or eq to)
     * in
     * nin:  ( not in)
     * 
     * ==> e.g :
     * find({prise: {$gt: 10, $lte: 20}}) >>  10 < prise <= 20
     * find({prise: {$in: [ 10, 15, 20]}}) >> has 10 or 15 ..
     * 
     * 
     * Les Operateurs Logique
     * 
     * OR:   .or ([ {condion1}, {condion2}, .. ]) >> condion1 || condion2
     * AND:  .and([ {condion1}, {condion2}, .. ]) >> condion1 && condion2
     * 
     * chaine de charactre 
     * like :  pattern 
     * e.g:  ^, $, i 
     * 
     *   name: /^yAsiNe/  >> name start with 'yAsiNe' (and match case )
     *   name: /yAsiNe$/  >> name end   with 'yAsiNe'  (and match case )
     *   name: /^yAsiNe/i >> name start with 'yAsiNe' 
     *   name: / .*yAsiNe.* /i >> name has 'yAsiNe'  ( like in SQL )
     * 
     * Pagination >>  .skip
     * 
     */

const db_name      = 'brightcoding-db-test';
const mongoose     = require('mongoose')
const courseSchema = require('./CourseSchema')

mongoose.connect('mongodb://localhost:27017/'+db_name)
.then( () => console.log("connect with success"))
.catch( (e) => console.log(e) )

const Course = mongoose.model('Course', courseSchema)

const  addCourse = async() => {
    const course_obj = new Course({
        name: "Stmfony 5",
        author: "malim Hamid",
        category: 'Web',
        tags: ['Web'],
        isPublished: true,
        price: 76.7
    });
    // save 
    try {
        const res = await course_obj.save();
        console.log( res );
    } catch (err) {
        const erros = {};
        for(field in err.errors)
            erros[field] =  err.errors[field].message;
        console.error( erros)
    }
   
}
addCourse()

const getCourses = async () => {  
    const pageSize  = 10
    let   pageCurrent  = 1
    const courses  = await Course.find({isPublished:  {$ne: false} /** no equl */ })
                                // .or([{name: /^symfony/i}, {name: /php$/i}])
                                  .select({name: 1, author: 1, date: 1, _id:0})                    
                                  .sort({name: 1})
                                 // .skip( ( pageCurrent - 1 ) * pageSize ) /** Pagination */
                                  .limit(pageSize)
                                  
    console.log( courses )
}

const updateCourse = async (id) => {
    // const course = await Course.findById(id);
    // console.log('before ; ', course )
    // course.name = "GraphQl";
    // course.author = "Lior chamla"
    // course.save()
    // console.log( 'after : ',course )
    //  OR {2nd method}
  
    let old_obj = await Course.findByIdAndUpdate({ _id: id}, {
        $set: {
             name: "GraphQl",
            author: "Lior Chamla",
            isPublished: false
        }
    },{new: false /** get old object {befor update} */})
    console.log( 'after : ', old_obj )
}
//updateCourse('629cb441c2cb899c9ee8489e')


//getCourses()

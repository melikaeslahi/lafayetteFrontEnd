
import { Field } from "formik";




const SubCategories = ({ childrens }) => {



    return (
        <>
            <section className={`   'flex flex-col w-full `}>
                {childrens?.map((category, index) => (
                    <>
                        <section key={index} className="pr-2 flex flex-col justify-between items-center mb-1 w-full">
                            <section className="flex justify-between items-center w-full">
                                <label className={'p-2 justify-start text-pallete '} htmlFor={category.id}>{category.name}</label>

                                <Field
                                    className={'p-2 justify-end '}
                                    type={'checkbox'}
                                    name="categories"
                                    id={category.id}
                                    value={category.id.toString()}
                                />
                            </section>


                        </section>

                        <section className={'flex flex-col'}>
                            {category.children.length > 0 ? <SubCategories childrens={category.children} /> : null}
                        </section>
                    </>


                ))}
            </section>
        </>)
}
export default SubCategories;
import { Field } from "formik";
import Image from "next/image";

const SelectImage = ({ image }) => {
    return (
        <>
            <Field type='radio' name={'currentImage'}
                className={`shadow-lg text-left appearance-none dark:text-gray-100  dark:bg-zinc-600  rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none   focus:border-pallete  `}
            >
                {({ field, form }) => {
                    return (
                        <>
                            <section className="flex flex-row justify-between items-center">
                                {image !== null && Object.entries(image.indexArray).map(([key, value]) => (
                                    <section className="p-5" key={key}>
                                        <div className="">
                                            <input type="radio" name="currentImage" value={key}
                                                id={`${key}`} className=""
                                                defaultChecked={image.currentImage === key ? true : false}
                                                onChange={(event) => {
                                                    form.setFieldValue(field.name, event.target.value)
                                                }}
                                            />
                                            <label htmlFor={`${key}`} className="">
                                                <Image src={` ${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="" width={key === 'large' ? 250 : key === 'medium' ? 150 : 100} height={key === 'large' ? 250 : key === 'medium' ? 150 : 100} className="w-100" />
                                            </label>
                                        </div>
                                    </section>
                                )
                                )
                                }
                            </section>
                        </>
                    )
                }}
            </Field>
        </>
    )
}
export default SelectImage;
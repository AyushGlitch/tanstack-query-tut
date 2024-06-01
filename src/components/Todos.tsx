import { useCreateTodo } from '../services/mutations'
import { useTodos, useTodosIds } from '../services/queries'
import { Todo } from '../types/todo'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Todos() {

    const todosIdsQuery= useTodosIds()
    const todosQueries= useTodos(todosIdsQuery.data)
    // console.log(todosQueries)


    const createTodoMutation= useCreateTodo()
    const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data)
    }

    const { register, handleSubmit } = useForm<Todo>()

    if (todosIdsQuery.isPending) {
        return <div>Loading...</div>
    }

    if (todosIdsQuery.isError) {
        return <div>Error...</div>
    }

    return (
        <>

            <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
                <h4>New Todo:</h4>
                <input placeholder='Title' {...register('title')} />
                <input placeholder='Description' {...register('description')} />
                <input type='submit'/>
            </form>

            {
                todosIdsQuery.data.map( (id) => (
                    <div key={id}>
                        ID: {id}
                    </div>
                ) )
            }


            {
                todosQueries.map( ({data}) => (
                    <li key={data?.id}>
                        <div>ID: {data?.id}</div>
                        <span>
                            <strong>Title: </strong> {data?.title}
                            <strong>Description: </strong> {data?.description}
                        </span>
                    </li>
                ) )
            }
        </>
    )
}

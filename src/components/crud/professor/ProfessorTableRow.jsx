import React, { useState } from "react";
import { Link } from "react-router-dom";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";

const ProfessorTableRow = (props) => {
    const {_id,name,university,degree} = props.professor
    const [loading, setLoading] = useState(false)

    function deleteProfessor() {
        setLoading(true)
        if (window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
            FirebaseProfessorService.delete(
                props.firestore,
                ()=>{
                    setLoading(false)
                    props.setToast({ header: 'Erro!', body: 'Professor ' + _id + ' apagado com sucesso!' })
                    props.setShowToast(true)
                },
                _id)

        }
    }

    const renderSubmitButton = () => {
        if (loading) {
            return (
                
                    <button className="btn btn-danger" type="button" disabled style={{width:'75px'}}>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        
                    </button>
                
            )
        }
        return (
             
                <button className="btn btn-danger" style={{width:'75px'}}  onClick={() => deleteProfessor()}>Apagar</button>
            
        )
    }

    return (
        <tr>
            <td>
                {_id}
            </td>
            <td>
                {name}
            </td>
            <td>
                {university}
            </td>
            <td>
                {degree}
            </td>
            <td style={{textAlign:"center"}}>
                <Link to={`/editProfessor/${_id}`} className="btn btn-primary">Editar</Link>
            </td>
            <td style={{textAlign:"center"}}>
                {renderSubmitButton()}
            </td>
        </tr>
    )
}

export default ProfessorTableRow
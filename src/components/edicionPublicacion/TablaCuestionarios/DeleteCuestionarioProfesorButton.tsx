import { IconButton } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { useTableCuestionarios } from './Hooks/useTableCuestionarios';

interface Props {
    idCuestionario: string
}

export const DeleteCuestionarioProfesorButton: React.FC<Props> = ({ idCuestionario }) => {
    const { deleteCuestionarioProfesor } = useTableCuestionarios()

    return (
        <IconButton
            onClick={() => {
                if (window.confirm('Está seguro de eliminar el Cuestionario?')) {

                    deleteCuestionarioProfesor(idCuestionario)
                }
            }}>


            <DeleteIcon color='error' />
        </IconButton>
    )
}

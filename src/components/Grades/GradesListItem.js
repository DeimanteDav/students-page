import { TableCell, TableRow, Tooltip } from '@mui/material'
import React from 'react'

const GradesListItem = ({rows}) => {
    console.log(rows);
   
  return (
    rows.map((row) => (
        <TableRow
            key={row.oneClass.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {row.oneClass.name}
            </TableCell>
            {(row.classGrades && row.classGrades.length > 0) ? (
                row.classGrades.map(grade => {
                    let date = new Date(grade.date)
                    let updatedDate = new Date(grade.updatedDate)
                    return (
                        <Tooltip title={date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()} placement='top-end'>
                            <TableCell key={grade.id} align="right">{grade.value}</TableCell>
                        </Tooltip>

                    )

                })
            ) : (
                <TableCell align='right'>-</TableCell>
            )}
        </TableRow>
    ))
  )
}

export default GradesListItem
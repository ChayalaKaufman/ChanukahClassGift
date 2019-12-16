import React from 'react';

export default function CallsOrEmailsRow({ callOrEmail }) {
    return (
        <tr>
            <td>{new Date(Date.parse(callOrEmail.date)).toDateString()}</td>
            <td>{callOrEmail.type}</td>
            <td>{callOrEmail.notes}</td>
        </tr>
    );
}
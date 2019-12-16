import React from 'react';

export default function CollectionRow({ collection }) {
    return (
        <tr>
            <td>{collection.date}</td>
            <td>{collection.type}</td>
            <td>{collection.notes}</td>
        </tr>
    );
}
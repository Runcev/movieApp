import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import api from '../api'
import styled from 'styled-components'
import validate from "../utils/validator";

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
  margin: 0 30px;
`

const Label = styled.label`
  margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`

class MoviesUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            releaseYear: '',
            format: '',
            stars: '',
            isValidData: true,
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputReleaseTear = async event => {
        const releaseYear =
            event.target.value.replace(/[^0-9]/gi, "").replace(/^0+/g, "") || "";

        this.setState({ releaseYear })
    }

    handleChangeInputFormat = async event => {
        const format = event.target.value
        this.setState({ format })
    }

    handleChangeInputStars = async event => {
        const stars =
            event.target.value.replace(/[^a-zA-Z- ,]/gi, "")

        this.setState({stars})
    }

    handleUpdateMovie = async () => {
        const { id, title, releaseYear, format, stars } = this.state
        const payload = { title, releaseYear, format, stars }
        const isValidData = validate(title, releaseYear, stars)

        if(isValidData){
            await api.updateMovieById(id, payload).then(res => {
                toast.success('Movie updated successfully')
                /*this.setState({
                    title: '',
                    releaseYear: '',
                    format: '',
                    stars: '',
                })*/
            })
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        const movie = await api.getMovieById(id)

        this.setState({
            title: movie.data.data.title,
            releaseYear: movie.data.data.releaseYear,
            format: movie.data.data.format,
            stars: movie.data.data.stars,
        })
    }

    render() {
        const { title, releaseYear, format, stars } = this.state
        return (
            <Wrapper>
                <ToastContainer/>

                <Title>Create Movie</Title>

                <Label>*Title: </Label>
                <input className="form-control"
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>*Release Year: </Label>
                <input className="form-control"
                    type="text"
                    value={releaseYear}
                    onChange={this.handleChangeInputReleaseTear}
                />

                <Label>*Format: </Label>
                <select className="form-select" value={format} onChange={this.handleChangeInputFormat}>
                    <option value="DVD">DVD</option>
                    <option value="VHS">VHS</option>
                    <option value="Blu-Ray">Blu-Ray</option>
                </select>


                <Label>*Stars: </Label>
                <input className="form-control"
                    type="text"
                    value={stars}
                    onChange={this.handleChangeInputStars}
                />

                <Button onClick={this.handleUpdateMovie}>Update Movie</Button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default MoviesUpdate
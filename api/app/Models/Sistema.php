<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sistema extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'descricao',
        'sigla',
        'email',
        'url',
        'status'
    ];

    /**
     * Scope de Filtros por Descrição
     *
     * @param Builder $query
     * @param String|null $descricao
     * @return Builder
     */
    public function scopeFilterByDescricao(Builder $query, String $descricao = null) : Builder
    {
        if($descricao)
            return $query->where('descricao', 'LIKE', '%'.$descricao.'%', 'AND');

        return $query;
    }

    /**
     * Scope de Filtros por Sigla
     *
     * @param Builder $query
     * @param String|null $sigla
     * @return Builder
     */
    public function scopeFilterBySigla(Builder $query, String $sigla = null)  : Builder
    {
        if($sigla)
            return $query->where('sigla', 'LIKE', '%'.$sigla.'%', 'AND');

        return $query;
    }

    /**
     * Scope de Filtros por E-mail
     *
     * @param Builder $query
     * @param String|null $email
     * @return Builder
     */
    public function scopeFilterByEmail(Builder $query, String $email = null) : Builder
    {
        if($email)
            return $query->where('email', 'LIKE', '%'.$email.'%', 'AND');

        return $query;
    }
}

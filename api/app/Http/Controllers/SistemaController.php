<?php

namespace App\Http\Controllers;

use App\Models\Sistema;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SistemaController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request) : JsonResponse
    {
        try {

            // Faz a validação dos campos do usuário
            $validacao = Validator::make($request->all(), [
                'descricao' => 'max:100',
                'sigla' => 'max:10',
                'email' => 'email|max:100',
            ],  [
                'email' => 'E-mail inválido.',
                'max' => 'O campo :attribute aceita no máximo :max caracteres.'
            ]);

            // Retorna os erros de validação para o usuário
            if ($validacao->fails()) {
                return response()->json($validacao->errors()->first(), 422);
            }

            // Faz a busca de acordo com os campos 'descrição', 'sigla', 'email'
            $sistemas = Sistema::filterByDescricao($request->descricao)
                ->filterBySigla($request->sigla)
                ->filterByEmail($request->email)
                ->get();

            // Verifica se não encontrou informação
            if(count($sistemas) === 0)
                return response()->json('Nenhum Sistema foi encontrado. Favor revisar os critérios da sua pesquisa!', 404);

        } catch (\Exception $exception) {

            return response()->json($exception->getMessage(), 500);

        }

        return response()->json($sistemas);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request) : JsonResponse
    {
        try {

            // Faz a validação dos campos do usuário
            $validacao = Validator::make($request->all(), [
                'descricao' => 'required|max:100',
                'sigla' => 'required|max:10',
                'email' => 'email|max:100',
                'url' => 'max:50'
            ],  [
                'email' => 'E-mail inválido.',
                'required' => 'O campo :attribute é obrigatório e não foi informado.',
                'max' => 'O campo :attribute aceita no máximo :max caracteres.'
            ]);

            // Retorna os erros de validação para o usuário
            if ($validacao->fails()) {
                return response()->json($validacao->errors()->first(), 422);
            }

            // É necessário atribuir o request em uma variável, pois o Lumen não deixa altera o $request;
            $dados = $request->all();
            $dados['status'] = 'Ativo';
            // Faz a criação de um sistema
            Sistema::create($dados);

        } catch (\Exception $exception) {

            return response()->json($exception->getMessage(), 500);

        }

        return response()->json('Operação realizada com sucesso.');
    }
}
